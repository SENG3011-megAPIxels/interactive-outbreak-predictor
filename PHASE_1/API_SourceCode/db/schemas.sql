CREATE TABLE unemployment
(
    country_code text,
    month_year text,
    unemployment_value float,
    PRIMARY KEY (country_code, month_year)
);

CREATE TABLE future_unemployment
(
    country_code text,
    month_year text,
    unemployment_value float,
    PRIMARY KEY (country_code, month_year)
);

CREATE TABLE exchange_rates
(
    currency_code text,
    month_year text,
    rate float,
    PRIMARY KEY (currency_code, month_year)
);

CREATE TABLE currency_info
(
    country_code text,
    country_code_a2 text,
    country_name text,
    currency_code text,
    currency_name text,
    PRIMARY KEY (country_code)
);

CREATE TABLE stocks
(
    stock_code text,
    country_code text,
    month_year text,
    stock_value float,
    PRIMARY KEY (stock_code, country_code, month_year)
);

CREATE TABLE salaries
(
    country_code text,
    month_year text,
    job text,
    job_title text,
    salary float,
    PRIMARY KEY (country_code, month_year, job_title)
);
