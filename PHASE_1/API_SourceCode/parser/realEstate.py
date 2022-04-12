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
        from real_estate
        where country_code = '{country_code}'
        """

    curr.execute(query1)
    months = curr.fetchall()

    if not months:
        raise Exception("Error: not a valid search")

    months_dict = {}

    for month_obj in months:
        month_year = month_obj[0]
        query2=f"""
            select region, price
            from real_estate
            where country_code = '{country_code}'
            and month_year = '{month_year}'
            """

        curr.execute(query2)
        query_objects = curr.fetchall()
        
        if not query_objects:
            raise Exception("Error: not a valid search")

        month_dict = {}

        for price_object in query_objects:
            region = price_object[0]
            price = price_object[1]
            month_dict[region] = price
        
        months_dict[month_year] = month_dict

    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(months_dict)
    }
    
    return res
