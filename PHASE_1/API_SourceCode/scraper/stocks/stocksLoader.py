import csv
import requests
import psycopg2
import re

stocks = ['AAPL', 'CMCSA', 'GOOGL', 'NFLX', 'PYPL', 'AMZN', 'FB', 'MSFT', 'NVDA', 'TSLA']
years = ['2019', '2020', '2021', '2022']

country = 'USA'
table_name = 'stocks'

def isMatch(date):
    # firstOfMonth = re.match('[0-1][0-9]/01/20[1-2][0-9]', date)
    dateSplit = date.split('/')
    year = dateSplit[2]
    month = dateSplit[0]
    if year in years:
        yearMatch = True
    else:
        yearMatch = False
    if year == '2019' and month != '12':
        match2019 = False
    else:
        match2019 = True
    if yearMatch and match2019:
        return True
    else:
        return False

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

for stock in stocks:
    with open(f"{stock}.csv", 'r') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        lineCount = 0
        for row in reader:
            # Skip first line
            if lineCount == 0:
                lineCount += 1
            else:
                date = row[0]
                match = isMatch(date)
                dateSplit = date.split('/')
                year = dateSplit[2]
                month = dateSplit[0]
                monthYear = month + '-' + year[2:]
                if match:
                    value = row[1][1:]
                    print(f"INSERTING {stock} {country} {monthYear}, {value} into {table_name}")
                    curr.execute(
                        f"""
                        INSERT INTO {table_name}(stock_code, country_code, month_year, stock_value)
                        VALUES ('{stock}', '{country}', '{monthYear}', '{value}')
                        ON CONFLICT (stock_code, country_code, month_year) DO UPDATE SET stock_value = {value}
                    """
                    )

curr.execute("COMMIT")
curr.close()
