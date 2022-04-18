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

    query=f"""
        select currency_code
        from currency_info
        where country_code = '{country_code}'
        """

    curr.execute(query)
    query_objects = curr.fetchall()
    
    if not query_objects:
        raise Exception("Error: not a valid search")

    currency_code = query_objects[0][0]

    query=f"""
        select month_year, rate
        from exchange_rates
        where currency_code = '{currency_code}'
        """
    
    curr.execute(query)
    query_objects = curr.fetchall()

    months_dict = {}

    for month in query_objects:
        month_object = {}
        month_year = month[0]
        month_object['rate'] = month[1]
        months_dict[month_year] = month_object

    query=f"""
        select month_year, rate
        from future_exchange_rates
        where currency_code = '{currency_code}'
        """
    
    curr.execute(query)
    query_objects = curr.fetchall()

    for month in query_objects:
        month_object = {}
        month_year = month[0]
        month_object['rate'] = month[1]
        months_dict[month_year] = month_object

    #print(json.dumps(months_dict))

    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
        },
        "body": json.dumps(months_dict)
    }
    
    return res

#lambda_handler({"country":"AUS"}, 2)