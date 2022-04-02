import csv
import psycopg2
import pycountry

# Fetches and stores global currency data in db

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

with open('currencyinfo.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    lineCount = 0
    for row in reader:
        # Skip first line
        if lineCount == 0:
            lineCount += 1
        else:
            country_code_a2 = row[1]
            country_name = row[0]
            currency_name = row[2]
            currency_code = row[3]
            country_data = pycountry.countries.get(alpha_2=country_code_a2)
            if not country_data:
                continue
            country_code = country_data.alpha_3
            print(f"INSERTING {country_name} {country_code} {currency_code}, into currency info")
            curr.execute(
                f"""
                INSERT INTO currency_info(country_code, country_code_a2, country_name, currency_code, currency_name)
                VALUES ('{country_code}', '{country_code_a2}', '{country_name}', '{currency_code}', '{currency_name}')
                """
            )

curr.execute("COMMIT")
curr.close()
