import json
import psycopg2
import requests
# import os

def lambda_handler(event, context):
    db_host = "database-2.cjcukgskbtyu.ap-southeast-2.rds.amazonaws.com"
    db_user = "postgres"
    db_password = "sengpsql" # Please don't hack us
    # db_password = os.environ["DB_PASSWORD"]
    db_name = "database2"
    db_port = 5432

    conn = psycopg2.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        dbname=db_name,
        db_port=db_port
    )

    curr = conn.cursor()
    curr.execute(f"""
    select article_id, url, title, TO_CHAR(article_date, 'yyyy-MM-dd HH24:MI:SS', raw_text, report
    from articles
    where article_date
    between '{event[start_date]}' and '{event[end_date]}'
    """)

    article_objects = cur.fetchall()

    articles_list = []

    for article in article_objects:
        article_json = {
            "url": article[1],
            "date_of_publication": article[3],
            "headline": article[2],
            "main_text": article[4]
            # "reports": article[5]
        }
        articles_list.append(article_json)

    terms = event["key_terms"].split(',')
    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        # "body": json.dumps("Displaying reports of " + ', '.join(terms) + 
        # " between " + event["start_date"] + " and " + event["end_date"] + " in " 
        #  + event["location"] + " " + event["timezone"])
        "body": json.dumps(articles_list)
    }
    
    return res
