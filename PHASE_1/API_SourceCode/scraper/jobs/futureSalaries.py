import psycopg2
from statsmodels.tsa.ar_model import AutoReg
import numpy

# create a difference transform of the dataset
def difference(dataset):
	diff = list()
	for i in range(1, len(dataset)):
		value = dataset[i] - dataset[i - 1]
		diff.append(value)
	return numpy.array(diff)

# Make a prediction give regression coefficients and lag obs
def predict(coef, history):
	yhat = coef[0]
	for i in range(1, len(coef)):
		yhat += coef[i] * history[-i]
	return yhat

# AutoRegression Reference: https://machinelearningmastery.com/make-predictions-time-series-forecasting-python/
def createPredictions(series):
    # split dataset
    X = difference(series)
    size = int(len(X) * 0.66)
    train, test = X[0:size], X[size:]
    # train autoregression
    window = 6
    model = AutoReg(train, lags=1)
    model_fit = model.fit()
    coef = model_fit.params
    # walk forward over time steps in test
    history = [train[i] for i in range(len(train))]
    predictions = list()
    for t in range(len(test)):
        yhat = predict(coef, history)
        obs = test[t]
        predictions.append(abs(yhat + series[len(series) - 1]))
        history.append(obs)

    return predictions

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

future_dates = ["04-22", "05-22", "06-22", "07-22"]

curr.execute("""
    SELECT iso_code
    FROM countries;
""")

iso_codes = curr.fetchall()

for row in iso_codes:
    iso = row[0]
    
    curr.execute(f"""
        SELECT distinct job
        FROM salaries
        WHERE country_code = '{iso}';
    """)

    past_data = curr.fetchall()

    if past_data == []:
        continue 

    jobs = []

    for row in past_data:
        jobs.append(row[0])

    for job in jobs:
        curr.execute(f"""
        SELECT salary, job_title
        FROM salaries
        WHERE country_code = '{iso}' and job = '{job}';
        """)

        past_data = curr.fetchall()

        if past_data == []:
            continue 

        salary_series = []
        job_title = past_data[0][1]

        for row in past_data:
            salary_series.append(row[0])

        salary_predictions = createPredictions(salary_series)
        
        for i, month in enumerate(future_dates):
            curr.execute(
                f"""
                INSERT INTO future_salaries(country_code, month_year, job, job_title, salary)
                VALUES('{iso}', '{month}', '{job}', '{job_title}', '{salary_predictions[i]}')
                """
            )

        curr.execute("COMMIT")

