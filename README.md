# Interactive Outbreak Predictor (IOP)

IOP was created for the SENG3011: Software Engineering Workshop 3 in T1 2022 by team _MegAPIxels_: Samuel Thorley (z5257239), Lachlan Fraser (z5258840), Rubin Roy (z5168911), Austin Walsh (z5311341), Humza Saeed (z5309373).

The project consists of two phases. Phase 1 involved creating a scraper and API for [ProMed](https://promedmail.org). Phase 2 involved creating an application using our API from Phase 1. The API (including additions for Phase 2) can be found under the `./PHASE_1` subdirectory and the frontend code can be found under the `./PHASE_2` subdirectory. Submitted reports for the course can be found under the `./Reports` subdirectory.

The application is a data analytic and machine learning tool that allows users to visualise global COVID-19 data as a global heatmap or a country/sub-region specific graph and predict case and death numbers for the future. The user can also choose to implement certain restrictions and see their effect on the COVID-19 predictions. Other data such as unemployment, exchange rates, average salary by industry, value of the top 10 stocks, house price index, and their preditions for the future are also included. The backend is hosted on _Amazon Web Services_ and the frontend is deployed on _CloudFlare Pages_. Refer to reports for more details.

Phase 1 Reports:
- Design Details
- Management Information
- Testing Documentation

Phase 2 Reports:
- Final Report

## Usage

**Note: These can be run as long as the backend is being maintained on AWS. This will likely not be the case after course marks are released due to incurred AWS costs.**

### Phase 1

#### Swagger

The documentation for each query can be found in the docs [here](http://swagger-env-1.eba-zzwsivt4.ap-southeast-2.elasticbeanstalk.com/docs/).
Sample query parameters can be autofilled by clicking the 'Try it out' button.

#### HTTP

Alternatively it can be run with query name and parameters passed:
```
https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/
```

### Phase 2

#### Accessing the Frontend

The app can be accessed at the deployed CloudFlare Pages address:

```
https://seng3011-megapixels.pages.dev
```

#### Run locally

Alternatively the frontend can be run locally using the instructions in `./PHASE_2/Application_SourceCode/README.md`.
