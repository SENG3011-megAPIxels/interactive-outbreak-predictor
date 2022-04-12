import requests
import psycopg2

apiId = '0c28cb57'
apiKey = 'd1fe99bf73d444c85538f67d743bea34'

jobType = 'travel-jobs'
jobTitle = 'Travel Jobs'

countries = ['us', 'au']

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
for country in countries:
    response = requests.get(f"http://api.adzuna.com/v1/api/jobs/{country}/history?app_id={apiId}&app_key={apiKey}&category={jobType}&months=29")

    payload = response.json()

    print(payload)

    data = payload['month']

    if country == 'au':
        country_code = 'AUS'
    elif country == 'us':
        country_code = 'USA'

    for data_month, data_value in data.items():
        date_split = data_month.split('-')
        year = date_split[0]
        month = date_split[1]
        month_year = month + '-' + year[2:]
        salary = data_value

        print(f"INSERTING {country_code} {month_year} {jobType} {salary} into salaries")

        curr.execute(
            f"""
            INSERT INTO salaries(country_code, month_year, job, job_title, salary)
            VALUES ('{country_code}', '{month_year}', '{jobType}', '{jobTitle}', {salary})
            """
        )

curr.execute("COMMIT")
curr.close()
