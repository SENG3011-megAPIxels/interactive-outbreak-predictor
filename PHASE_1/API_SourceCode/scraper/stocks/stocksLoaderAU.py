import csv
import psycopg2
import calendar

stocks = ['BHP', 'CBA', 'RIO', 'WBC', 'CSL', 'ANZ', 'NAB', 'MQG', 'WOW', 'WES']

years = ['2019', '2020', '2021', '2022']

country = 'AUS'
table_name = 'stocks'

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
                dateSplit = date.split(' ')
                year = dateSplit[1]
                monthName = dateSplit[0]
                month = list(calendar.month_abbr).index(monthName)
                monthYear = str(month) + '-' + year
                
                value = row[1]
                print(f"INSERTING {stock} {country} {monthYear}, {value} into {table_name}")
                curr.execute(
                    f"""
                    INSERT INTO {table_name}(stock_code, country_code, month_year, stock_value)
                    VALUES ('{stock}', '{country}', '{monthYear}', '{value}')
                """
                )

curr.execute("COMMIT")
curr.close()
