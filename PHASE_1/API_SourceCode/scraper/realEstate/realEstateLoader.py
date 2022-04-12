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

table_name = "real_estate"
country = 'AUS'

def mapQuarter(quarter):
    if quarter == 'Q1':
        return '03'
    elif quarter == 'Q2':
        return '06'
    elif quarter == 'Q3':
        return '09'
    elif quarter == 'Q4':
        return '12'

with open('prices.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    lineCount = 0
    for row in reader:
        # Skip first line
        if lineCount == 0:
            lineCount += 1
        else:
            date = row[5]
            date_split = date.split('-')
            year = date_split[0]
            quarter = date_split[1]
            month = mapQuarter(quarter)
            month_year = str(month) + '-' + year[2:]

            value = row[6]

            region_split = row[3].split(':')
            region = region_split[1][1:]

            if region == 'Weighted average of eight capital cities':
                region = 'National Average'

            print(f"INSERTING {country} {region} {month_year} {value} into {table_name}")
            curr.execute(
                f"""
                INSERT INTO {table_name}(country_code, region, price, month_year)
                VALUES ('{country}', '{region}', '{value}', '{month_year}')
                """
            )

curr.execute("COMMIT")
curr.close()
