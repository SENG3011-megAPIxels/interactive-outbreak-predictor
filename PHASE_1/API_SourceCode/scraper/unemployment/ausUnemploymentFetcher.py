import csv
import requests
import psycopg2

# Fetches and stores aus unemployment data in db

url = "https://www.econdb.com/api/series/URATEAU/?format=csv"

r = requests.get(url)

# Output unemployment data to temp csv file
with open('unemployment.csv', 'wb') as f:
    f.write(r.content)

# db_host = "database-2.cjcukgskbtyu.ap-southeast-2.rds.amazonaws.com"
# db_user = "postgres"
# db_password = "sengpsql" # Please don't hack us
# db_name = "database2"
# db_port = 5432

# conn = psycopg2.connect(
#     host=db_host,
#     user=db_user,
#     password=db_password,
#     dbname=db_name,
#     port=db_port
# )
conn = psycopg2.connect("testing")
curr = conn.cursor()

with open('unemployment.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    lineCount = 0
    for row in reader:
        # Skip first line
        if lineCount == 0:
            lineCount += 1
        else:
            if row[0] >= '2019-12-01':
                date_split = row[0].split('-')
                year = date_split[0]
                month = date_split[1]
                month_year = month + '-' + year[2:]
                print(f"INSERTING {month_year}, {row[1]} into unemployment")
                curr.execute(
                    f"""
                    INSERT INTO unemployment(month_year, unemployment_value)
                    VALUES ('{month_year}', '{row[1]}')
                    """
                )

curr.execute("COMMIT")
curr.close()
