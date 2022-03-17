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
    
    article_id = event["article_id"]
    if not re.match(r"^[0-9]{7}$", article_id):
        raise Exception("Error: invalid article_id")
    

    # print(f"Running article query for {event["article_id"]}")
    curr = conn.cursor()
    curr.execute(f"""
    select *
    from articles a
    join reports r on a.article_id=r.article_id
    where a.article_id = '{article_id}'
    """)

    articles = curr.fetchall()

    if not articles:
        raise Exception("Error: not a valid article ID")
        
    reports_list = []

    for article in articles:
        report = {
            "report_id": article[7],
            "report": article[8]
        }
        reports_list.append(report)
    
    if not reports_list:
        raise Exception("Error: not a valid article ID")
        
    article_json = {
        "url": articles[0][1],
        "date_of_publication": f"{articles[0][3]}",
        "headline": articles[0][2],
        "main_text": articles[0][4],
        "reports": reports_list
    }

    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(article_json)
    }
    
    return res
