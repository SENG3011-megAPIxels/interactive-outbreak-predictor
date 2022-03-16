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
    r_format = r"^[0-9]{4}-[0-9]{2}-[0-9]{2}$"

    # did not provide start/end date
    if any(input is '' for input in (start_date, end_date)):
        raise Exception("Error: incorrect input")
    elif not re.match(r_format, start_date) or not re.match(r_format, end_date):
        raise Exception("Error: invalid date format")
    elif end_date < start_date:
        raise Exception("Error: end_date before start_date")

    terms = event["key_terms"].split(',')

    sql=f"""
        select *
        from articles
        where article_date
        between '{start_date}' and '{end_date}'
        """
    # no key terms used in search
    if any("null" in terms for term in terms) or terms == ['']:
        curr.execute(sql)
    else:
        sql = sql + "and (%s) && key_terms"
        curr.execute(sql,(terms,))

    article_objects = curr.fetchall()

    articles_list = []

    for article in article_objects:
        article_json = {
            "url": article[1],
            "date_of_publication": f"{article[3]}",
            "headline": article[2],
            "key_terms": article[4],
            "main_text": article[5]
        }
        articles_list.append(article_json)

    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(articles_list)
    }
    
    return res
