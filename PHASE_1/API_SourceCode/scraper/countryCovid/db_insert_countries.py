import psycopg2
import json

with open('data.json', 'r') as f:
    data = json.load(f)

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

for iso in data:
    print(iso)
    for region in data[iso]:
        print(region)
        if region != "All":
            for month in data[iso][region]:
                print(data[iso][region][month]['newCases'])
                print(data[iso][region][month]['newDeaths'])
                curr.execute(
                    f"""
                    INSERT INTO country_covid(iso_code, month, subregion, new_cases, new_deaths) 
                    VALUES ('{iso}', '{month}', '{region}', '{data[iso][region][month]['newCases']}', '{data[iso][region][month]['newDeaths']}')
                    """
                )

curr.execute("COMMIT")