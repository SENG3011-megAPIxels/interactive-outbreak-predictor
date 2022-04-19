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

CREATE TABLE real_estate
(
    country_code text,
    region text,
    price float, 
    month_year text,
    PRIMARY KEY (country_code, region, month_year)
);

CREATE TABLE future_globalcovid_masks AS
SELECT * FROM global_covid;

CREATE TABLE future_globalcovid_lockdown AS
SELECT * FROM global_covid;

CREATE TABLE future_globalcovid_socialdistancing AS
SELECT * FROM global_covid;

CREATE TABLE future_globalcovid_masks_socialdistancing AS
SELECT * FROM global_covid;

CREATE TABLE future_countrycovid AS
SELECT * FROM country_covid;

CREATE TABLE future_countrycovid_masks AS
SELECT * FROM country_covid;

CREATE TABLE future_countrycovid_lockdown AS
SELECT * FROM country_covid;

CREATE TABLE future_countrycovid_socialdistancing AS
SELECT * FROM country_covid;

CREATE TABLE future_countrycovid_masks_socialdistancing AS
SELECT * FROM country_covid;

-- CREATE TABLE future_globalcovid_masks
-- (
--     iso_code text,
--     month text,
--     new_cases int,
--     new_deaths int,
--     total_vax int,
--     perc_vax float,
--     PRIMARY KEY (iso_code, month)
-- );

SELECT new_cases, new_deaths, month
FROM country_covid
WHERE iso_code = 'AUS' and subregion = 'Queensland' and month <> '12-19'
ORDER BY split_part(month, '-', 2), split_part(month, '-', 1)
;