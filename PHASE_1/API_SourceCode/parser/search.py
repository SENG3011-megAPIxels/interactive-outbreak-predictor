import json
import psycopg2
import re

def lambda_handler(event, context):
    db_host = "database-2.cjcukgskbtyu.ap-southeast-2.rds.amazonaws.com"
    db_user = "postgres"
    db_password = "sengpsql" # Please don't hack us
    db_name = "database2"
    db_port = 5432

    conn = psycopg2.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        dbname=db_name,
        port=db_port
    )
    curr = conn.cursor()

    start_date = event["start_date"]
    end_date = event["end_date"]
    terms = event["key_terms"].split(',')
    location = event["location"].lower()
    
    handleInput(start_date, end_date, terms, location)

    sql=f"""
        select *
        from articles a
        join reports r on a.article_id=r.article_id
        where article_date
        between '{start_date}' and '{end_date}'
        and array_to_string(location, ',') like '%{location}%'
        """
    # key terms used in search
    if not (any("null" in terms for term in terms) or terms == ['']):
        sql = sql + f"and ARRAY{terms} <@ key_terms"

    curr.execute(sql)
    article_objects = curr.fetchall()
    
    if not article_objects:
        raise Exception("Error: not a valid search")

    articles_dict = {}

    reports_dict = {}

    for article in article_objects:
        article_id = article[0]
        if article_id not in reports_dict:        
            reports_dict[article_id] = []
        reports_dict[article_id].append({
            "report_id": article[6],
            "report": article[8]
        })

    for article in article_objects:
        article_id = article[0]
        if article_id in articles_dict:
            continue
        
        article_json = {
            "url": article[1],
            "date_of_publication": f"{article[3]}",
            "headline": article[2],
            "key_terms": article[4],
            "main_text": article[5],
            "reports": reports_dict[article_id]
        }
        articles_dict[article_id] = article_json


    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(list(articles_dict.values()))
    }
    
    return res

def handleInput(start_date, end_date, key_terms, location):
    r_format = r"^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
    # did not provide start/end date
    if any(input is '' for input in (start_date, end_date, location)):
        raise Exception("Error: incorrect input")
    elif not re.match(r_format, start_date) or not re.match(r_format, end_date):
        raise Exception("Error: invalid date format")
    elif end_date < start_date:
        raise Exception("Error: end_date before start_date")
    try:
        terms = []
        for term in key_terms:
            terms.append(term.lower())
        return terms
    except Exception as e:
        raise Exception("Error: incorrect input")