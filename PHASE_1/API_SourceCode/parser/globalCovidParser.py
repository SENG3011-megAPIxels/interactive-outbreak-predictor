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

    query="""
        select *
        from global_covid
        order by iso_code
        """

    curr.execute(query)
    query_objects = curr.fetchall()
    
    if not query_objects:
        raise Exception("Error: not a valid search")

    global_dict = {}
    
    seen_iso = query_objects[0][0]
    country_dict = {}
    for i, country in enumerate(query_objects):
        iso = country[0]
        month_dict = {}
        if i == len(query_objects) - 1:
            month_dict['newCases'] = country[2]
            month_dict['newDeaths'] = country[3]
            month_dict['totalVax'] = country[4]
            month_dict['percVax'] = country[5]
            country_dict[country[1]] = month_dict
            global_dict[seen_iso] = country_dict
        elif iso == seen_iso:
            month_dict['newCases'] = country[2]
            month_dict['newDeaths'] = country[3]
            month_dict['totalVaccinated'] = country[4]
            month_dict['percVaccinated'] = country[5]
            country_dict[country[1]] = month_dict
        elif iso != seen_iso: 
            global_dict[seen_iso] = country_dict
            country_dict = {}
            seen_iso = iso
            month_dict['newCases'] = country[2]
            month_dict['newDeaths'] = country[3]
            month_dict['totalVaccinated'] = country[4]
            month_dict['percVaccinated'] = country[5]
            country_dict[country[1]] = month_dict

    #with open('ret.json', 'w') as f:
    #    json.dump(global_dict, f)

    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(global_dict)
    }
    
    return res