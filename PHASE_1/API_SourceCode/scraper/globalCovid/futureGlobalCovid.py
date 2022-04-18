import psycopg2
from statsmodels.tsa.ar_model import AutoReg
import numpy
import math

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
    model = AutoReg(train, lags=6)
    model_fit = model.fit()
    coef = model_fit.params
    # walk forward over time steps in test
    history = [train[i] for i in range(len(train))]
    predictions = list()
    for t in range(len(test)):
        yhat = predict(coef, history)
        obs = test[t]
        predictions.append(int(abs(yhat + series[len(series) - 1])))
        history.append(obs)

    return predictions

# Applies a logistic function to predict the growth of a country's vaccinated population
def logisticPredictions(series):
    predictions = []
    current = series[len(series)-1]
    # If there is no covid vax data assume percentage vaccinated is 1%
    if current == 0:
        current = 1
    rate = math.log(((100/current)-1)/999)/-16
    for i in range(17, 26):
        new_value = 100/(1+(999*math.exp(-rate*i)))
        predictions.append(round(new_value, 2))

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

future_dates = ["04-22", "05-22", "06-22", "07-22", "08-22", "09-22", "10-22", "11-22", "12-22"]

curr.execute("""
    SELECT iso_code, population
    FROM countries;
""")

iso_codes = curr.fetchall()

for row in iso_codes:
    iso = row[0]
    population = row[1]
    
    curr.execute(f"""
    SELECT new_cases, new_deaths, total_vax, perc_vax
    FROM global_covid
    WHERE iso_code = '{iso}' and month <> '12-19';
    """)

    past_data = curr.fetchall()

    cases_series = []
    deaths_series = []
    vax_series = []
    percvax_series = []

    for row in past_data:
        cases_series.append(row[0])
        deaths_series.append(row[1])
        vax_series.append(row[2])
        percvax_series.append(row[3])

    cases_predictions = createPredictions(cases_series)
    deaths_predictions = createPredictions(deaths_series)
    percvax_predictions = logisticPredictions(percvax_series)
    vax_predictions = []
    for i in percvax_predictions:
        vax_predictions.append(int(population*(i/100)))
    
    
    for i, month in enumerate(future_dates):

        curr.execute(
            f"""
            UPDATE future_globalcovid
            SET new_cases = '{cases_predictions[i]}', new_deaths = '{deaths_predictions[i]}', total_vax = '{vax_predictions[i]}', perc_vax = '{percvax_predictions[i]}'
            WHERE iso_code = '{iso}' and month = '{month}'
            """
        )

    curr.execute("COMMIT")