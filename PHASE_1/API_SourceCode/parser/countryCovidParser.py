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
        select *
        from country_covid
        where iso_code = '{country_code}'
        order by subregion
        """

    curr.execute(query)
    query_objects = curr.fetchall()

    country_dict = {}
    
    if query_objects:
        seen_reg = query_objects[0][2]
        region_dict = {}
        for i, subregion in enumerate(query_objects):
            sr = subregion[2]
            month_dict = {}
            if i == len(query_objects) - 1:
                month_dict['newCases'] = subregion[3]
                month_dict['newDeaths'] = subregion[4]
                region_dict[subregion[1]] = month_dict
                country_dict[seen_reg] = region_dict
            elif sr == seen_reg:
                month_dict['newCases'] = subregion[3]
                month_dict['newDeaths'] = subregion[4]
                region_dict[subregion[1]] = month_dict
            elif sr != seen_reg: 
                country_dict[seen_reg] = region_dict
                region_dict = {}
                seen_reg = sr
                month_dict['newCases'] = subregion[3]
                month_dict['newDeaths'] = subregion[4]
                region_dict[subregion[1]] = month_dict
        
    #with open ('ret.json', 'w') as f:
        #json.dump(country_dict, f)

    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(country_dict)
    }
    
    return res

#lambda_handler({"country" : "AFG"}, 2)