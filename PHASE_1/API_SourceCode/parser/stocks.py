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
    curr = conn.cursor()

    country_code = event["country"]

    query1=f"""
        select distinct month_year
        from stocks
        """

    curr.execute(query1)
    months = curr.fetchall()

    months_dict = {}

    for month_query_obj in months:
        month = month_query_obj[0]
        query2=f"""
            select *
            from stocks
            where country_code = '{country_code}'
            and month_year = '{month}'
            """

        curr.execute(query2)
        query_objects = curr.fetchall()
        
        if not query_objects:
            raise Exception("Error: not a valid search")

        month_dict = {}

        for stock in query_objects:
            stock_code = stock[0]
            value = stock[3]
            month_dict[stock_code] = value
        months_dict[month] = month_dict

    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(months_dict)
    }
    
    return res
