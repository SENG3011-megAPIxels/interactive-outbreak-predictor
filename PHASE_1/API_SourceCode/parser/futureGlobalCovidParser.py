import json
import psycopg2

def getTable(event):
    masks = False
    lockdown = False
    social_distancing = False
    if 'masks' in event:
        masks = event['masks']
    if 'social_distancing' in event:
        social_distancing = event['social_distancing']
    if 'lockdown' in event:
        lockdown = event['lockdown']
    if lockdown:
        return 'future_globalcovid_lockdown'
    elif masks and social_distancing:
        return 'future_globalcovid_masks_socialdistancing'
    elif masks:
        return 'future_globalcovid_masks'
    elif social_distancing:
        return 'future_globalcovid_socialdistancing'
    else:
        return 'future_globalcovid'

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

    table = getTable(event)

    query=f"""
        select *
        from {table}
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
            month_dict['percVax'] = round(country[5], 2)
            country_dict[country[1]] = month_dict
            global_dict[seen_iso] = country_dict
        elif iso == seen_iso:
            month_dict['newCases'] = country[2]
            month_dict['newDeaths'] = country[3]
            month_dict['totalVaccinated'] = country[4]
            month_dict['percVaccinated'] = round(country[5], 2)
            country_dict[country[1]] = month_dict
        elif iso != seen_iso: 
            global_dict[seen_iso] = country_dict
            country_dict = {}
            seen_iso = iso
            month_dict['newCases'] = country[2]
            month_dict['newDeaths'] = country[3]
            month_dict['totalVaccinated'] = country[4]
            month_dict['percVaccinated'] = round(country[5], 2)
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
