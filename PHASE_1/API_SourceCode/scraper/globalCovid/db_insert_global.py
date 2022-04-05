import psycopg2
import json

with open('globaldata.json', 'r') as f:
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
    curr.execute(
        f"""
        INSERT INTO global_covid(iso_code, month, new_cases, new_deaths, total_vax, perc_vax) 
        VALUES ('{iso}', '12-19', '0', '0', '0', '0.0')
        """
    )

curr.execute("COMMIT")