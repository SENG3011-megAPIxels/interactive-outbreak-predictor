import json
import psycopg2
# import re
import pycountry

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
        select e.currency_code, c.currency_name, e.month_year, e.rate
        from exchange_rates e
        join currency_info c on (c.currency_code = e.currency_code)
        where c.country_code = '{country_code}'
        """

    curr.execute(query)
    query_objects = curr.fetchall()
    
    if not query_objects:
        raise Exception(f"Error: no currency data for {country_code}")

    months_dict = {}

    currency_code = query_objects[0][0]
    currency_name = query_objects[0][1]

    months_dict['currency_code'] = currency_code
    months_dict['currency_name'] = currency_name

    for month in query_objects:
        month_year = month[2]
        rate = month[3]
        months_dict[month_year] = rate

    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(months_dict)
    }
    
    return res
