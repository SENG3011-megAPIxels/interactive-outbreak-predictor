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
        from future_salaries
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
            select job, job_title, salary
            from future_salaries
            where country_code = '{country_code}'
            and month_year = '{month_year}'
            """

        curr.execute(query2)
        query_objects = curr.fetchall()
        
        if not query_objects:
            raise Exception("Error: not a valid search")

        month_dict = {}

        for job in query_objects:
            job_dict = {} 
            jobType = job[0]
            jobTitle = job[1]
            salary = job[2]
            job_dict['avgSalary'] = salary
            job_dict['jobTitle'] = jobTitle
            month_dict[jobType] = job_dict
        
        months_dict[month_year] = month_dict

    #with open('ret.json', 'w') as f:
        #json.dump(months_dict, f)

    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(months_dict)
    }
    
    return res

#lambda_handler({"country":"AUS"}, 2)