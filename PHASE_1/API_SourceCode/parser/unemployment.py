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

    country_code = event["country"]

    query=f"""
        select month_year, unemployment_value
        from unemployment u
        where u.country_code = '{country_code}'
        """

    curr.execute(query)
    query_objects = curr.fetchall()
    
    if not query_objects:
        raise Exception("Error: not a valid search")

    months_dict = {}

    for month in query_objects:
        month_object = {}
        month_year = month[0]
        month_object['percOfUnempl'] = month[1]
        # month_object['numOfUnempl'] = num_unempl
        months_dict[month_year] = month_object

    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(months_dict)
    }
    
    return res
