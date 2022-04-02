# access key: b070df542265127d4c781478837a5cfe

import requests
import psycopg2

access_key = 'b070df542265127d4c781478837a5cfe'

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

for month in range(1, 13):

    year = 20 # Manually changed per run

    response = requests.get(f"http://api.currencylayer.com/historical?access_key={access_key}&date=20{year}-{month:02d}-01")

    payload = response.json()

    quotes = payload['quotes']

    month_year = f"{month:02d}-{year}"

    for key, value in quotes.items():
        currency = key[3:]
        print(f"INSERTING {currency} {month_year} {value} into exchange_rates")
        curr.execute(
            f"""
            INSERT INTO exchange_rates(currency_code, month_year, rate)
            VALUES ('{currency}', '{month_year}', '{value}')
            """
        )
        
curr.execute("COMMIT")
curr.close()