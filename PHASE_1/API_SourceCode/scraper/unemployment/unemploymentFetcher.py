import csv
import requests
import psycopg2

# Fetches and stores global unemployment data in db

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
# conn = psycopg2.connect(dbname="testing")
curr = conn.cursor()

table_name = "future_unemployment"

with open('global_unemployment.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    lineCount = 0
    for row in reader:
        # Skip first line
        if lineCount == 0:
            lineCount += 1
        else:
            date = row[8]
            date_split = row[8].split('-')
            year = date_split[0]
            month = date_split[1]
            month_year = month + '-' + year[2:]
            country = row[2]
            value = row[16]
            print(f"INSERTING {country} {month_year}, {value} into {table_name}")
            curr.execute(
                f"""
                INSERT INTO {table_name}(country_code, month_year, unemployment_value)
                VALUES ('{country}', '{month_year}', '{value}')
                """
            )

curr.execute("COMMIT")
curr.close()
