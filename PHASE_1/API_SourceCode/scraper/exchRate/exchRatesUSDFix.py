import requests
import psycopg2

# USD needs to be adjusted as the source is 'USD' and will always be 1
# Hence it is changed to be relative to 'AUD' by inversing

# conn = psycopg2.connect(dbname="testing")

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

curr.execute(f"""
    SELECT *
    FROM exchange_rates
    WHERE currency_code = 'AUD'
""")
rows = curr.fetchall()
    
for row in rows:
    currency = row[0]
    month_year = row[1]
    value = 1 / row[2]
    
    curr.execute(
        f"""
        INSERT INTO exchange_rates(currency_code, month_year, rate)
        VALUES ('USD', '{month_year}', '{value}')
        """
    )

curr.execute("COMMIT")
curr.close()
