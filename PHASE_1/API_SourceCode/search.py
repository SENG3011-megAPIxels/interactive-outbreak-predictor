import json
import psycopg2
import requests

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
    curr.execute(f"""
    select *
    from articles
    where article_date
    between '{event["start_date"]}' and '{event["end_date"]}'
    """)

    article_objects = curr.fetchall()

    articles_list = []

    for article in article_objects:
        article_json = {
            "url": article[1],
            "date_of_publication": f"{article[3]}",
            "headline": article[2],
            "main_text": article[4]
            # "reports": article[5]
        }
        articles_list.append(article_json)

    #terms = event["key_terms"].split(',')
    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(articles_list)
    }
    
    return res
