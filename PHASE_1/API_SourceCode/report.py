import json
import psycopg2

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

    # print(f"Running report query for {event["report_id"]}")
    curr = conn.cursor()
    curr.execute(f"""
    select *
    from reports
    where report_id = '{event["report_id"]}'
    """)

    article = curr.fetchone()

    article_json = {
        "report_id": article[0],
        "article_id": article[1],
        "report": article[2],
    }

    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(article_json)
    }
    
    return res
