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
        return 'future_countrycovid_lockdown'
    elif masks and social_distancing:
        return 'future_countrycovid_masks_socialdistancing'
    elif masks:
        return 'future_countrycovid_masks'
    elif social_distancing:
        return 'future_countrycovid_socialdistancing'
    else:
        return 'future_countrycovid'

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

    table = getTable(event)

    query=f"""
        select *
        from {table}
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


# event = {}
# event['country'] = 'AUS'
# event['lockdown'] = True
# event['masks'] = True
# event['social_distancing'] = True

# res = lambda_handler(event, None)
# print(res)
