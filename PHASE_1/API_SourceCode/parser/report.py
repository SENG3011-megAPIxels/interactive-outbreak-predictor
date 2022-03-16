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

    report_id = event["report_id"]
    if not report_id.isdigit():
        raise Exception("Error: invalid report_id")
    
    curr = conn.cursor()
    curr.execute(f"""
    select *
    from reports
    where report_id = '{report_id}'
    """)

    report = curr.fetchone()

    report_json = {
        "report_id": report[0],
        "article_id": report[1],
        "report": report[2],
    }

    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(report_json)
    }
    
    return res
