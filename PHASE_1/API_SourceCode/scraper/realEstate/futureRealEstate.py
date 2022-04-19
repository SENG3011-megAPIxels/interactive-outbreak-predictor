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

future_dates = ["03-22", "06-22", "09-22"]

curr.execute(f"""
    SELECT distinct region
    FROM real_estate
    WHERE country_code = 'AUS';
""")

past_data = curr.fetchall()

regions = []

for row in past_data:
    regions.append(row[0])

for region in regions:
    curr.execute(f"""
    SELECT price
    FROM real_estate
    WHERE region = '{region}' and country_code = 'AUS';
    """)

    price_data = curr.fetchall()

    price_series = []

    for data in price_data:
        price_series.append(data[0])
    
    if price_series == []:
        continue

    price_predictions = createPredictions(price_series)

    print(price_predictions)
    
    for i, month in enumerate(future_dates):
        curr.execute(
            f"""
            INSERT INTO future_real_estate(country_code, region, price, month_year)
            VALUES('AUS', '{region}', '{price_predictions[i]}', '{month}')
            """
        )

    curr.execute("COMMIT")