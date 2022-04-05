import json
import requests
import csv

def globalCovidData():
    allData = {}

    confirmedResponse = requests.get("https://covid-api.mmediagroup.fr/v1/history?ab=TW&status=confirmed")
    deathsResponse = requests.get("https://covid-api.mmediagroup.fr/v1/history?ab=TW&status=deaths")
    
    cases = confirmedResponse.json()
    deaths = deathsResponse.json()

    for country in cases:
        countryDict = {}
        country.replace('*', '')
        if country == "Cote d'Ivoire":
            country = "Ivory Coast"
        elif country == "Korea, South":
            country = "South Korea"
        elif country == "Congo (Brazzaville)":
            country = "Congo"
        elif country == "West Bank and Gaza":
            country = "Palestine" 
        elif country == "US":
            country = "America"

        response = requests.get(f"https://restcountries.com/v3.1/name/{country}")
        data = response.json()

        try:
            if country == "Dominican Republic":
                cca3 = data[1]["cca3"]
                population = data[1]["population"]
            else:
                cca3 = data[0]["cca3"]
                population = data[0]["population"]
        except KeyError:
            continue
            #print(f"{country} : {data}")

        if country == "Ivory Coast" :
            country = "Cote d'Ivoire"
        elif country == "South Korea":
            country = "Korea, South"
        elif country == "Congo":
            country = "Congo (Brazzaville)"
        elif country == "Palestine":
            country = "West Bank and Gaza"
        elif country == "America":
            country = "US"

        casesTimeline = createTimeline(cases[country])
        deathsTimeline = createTimeline(deaths[country])
        
        #countryDict["population"] = population

        for month in casesTimeline.keys():
            monthDict = {}
            monthDict['newCases'] = casesTimeline[month]
            monthDict['newDeaths'] = deathsTimeline[month]

            if country == "Korea, South":
                country = "\"Korea, South\""
            
            with open('filtered_vax.csv', newline='') as vax:
                reader = csv.DictReader(vax)
                for row in reader:
                    if row['People_fully_vaccinated'] != '' and (row['Province_State'] == '' or row['Report_Date_String'] == '2021-10-31'): 
                        if country.lower() == row['Country_Region'].lower() and month == '12-20' and row['Report_Date_String'] == '2020-12-31':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break
                        elif country.lower() == row['Country_Region'].lower() and month == '01-21' and row['Report_Date_String'] == '2021-01-31':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break
                        elif country.lower() == row['Country_Region'].lower() and month == '02-21' and row['Report_Date_String'] == '2021-02-28':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break
                        elif country.lower() == row['Country_Region'].lower() and month == '03-21' and row['Report_Date_String'] == '2021-03-31':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break        
                        elif country.lower() == row['Country_Region'].lower() and month == '04-21' and row['Report_Date_String'] == '2021-04-30':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break    
                        elif country.lower() == row['Country_Region'].lower() and month == '05-21' and row['Report_Date_String'] == '2021-05-31':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break
                        elif country.lower() == row['Country_Region'].lower() and month == '06-21' and row['Report_Date_String'] == '2021-06-30':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break
                        elif country.lower() == row['Country_Region'].lower() and month == '07-21' and row['Report_Date_String'] == '2021-07-31':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break
                        elif country.lower() == row['Country_Region'].lower() and month == '08-21' and row['Report_Date_String'] == '2021-08-31':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break
                        elif country.lower() == row['Country_Region'].lower() and month == '09-21' and row['Report_Date_String'] == '2021-09-30':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break
                        elif country.lower() == row['Country_Region'].lower() and month == '10-21' and row['Report_Date_String'] == '2021-10-31':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break
                        elif country.lower() == row['Country_Region'].lower() and month == '11-21' and row['Report_Date_String'] == '2021-11-30':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break
                        elif country.lower() == row['Country_Region'].lower() and month == '12-21' and row['Report_Date_String'] == '2021-12-31':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break
                        elif country.lower() == row['Country_Region'].lower() and month == '01-22' and row['Report_Date_String'] == '2022-01-31':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break
                        elif country.lower() == row['Country_Region'].lower() and month == '02-22' and row['Report_Date_String'] == '2022-02-28':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break
                        elif country.lower() == row['Country_Region'].lower() and month == '03-22' and row['Report_Date_String'] == '2022-03-31':
                            monthDict['totalVaccinated'] = int(row['People_fully_vaccinated'])
                            monthDict['percVaccinated'] = round(((int(row['People_fully_vaccinated']) / population) * 100), 2)
                            break
            
            if 'totalVaccinated' not in monthDict:
                monthDict['totalVaccinated'] = 0
                monthDict['percVaccinated'] = 0
                
            countryDict[month] = monthDict
        
        if cca3 not in allData:
            allData[cca3] = countryDict
    
    with open('globaldata.json', 'w') as f:
        json.dump(allData, f)
    

def createTimeline(cases):
    casesTimeline = {}

    marCases22 = cases["All"]["dates"]["2022-03-31"] - cases["All"]["dates"]["2022-03-01"]
    febCases22 = cases["All"]["dates"]["2022-02-28"] - cases["All"]["dates"]["2022-02-01"]
    janCases22 = cases["All"]["dates"]["2022-01-31"] - cases["All"]["dates"]["2022-01-01"]

    decCases21 = cases["All"]["dates"]["2021-12-31"] - cases["All"]["dates"]["2021-12-01"]
    novCases21 = cases["All"]["dates"]["2021-11-30"] - cases["All"]["dates"]["2021-11-01"]
    octCases21 = cases["All"]["dates"]["2021-10-31"] - cases["All"]["dates"]["2021-10-01"]
    sepCases21 = cases["All"]["dates"]["2021-09-30"] - cases["All"]["dates"]["2021-09-01"]
    augCases21 = cases["All"]["dates"]["2021-08-31"] - cases["All"]["dates"]["2021-08-01"]
    julCases21 = cases["All"]["dates"]["2021-07-31"] - cases["All"]["dates"]["2021-07-01"]
    junCases21 = cases["All"]["dates"]["2021-06-30"] - cases["All"]["dates"]["2021-06-01"]
    mayCases21 = cases["All"]["dates"]["2021-05-31"] - cases["All"]["dates"]["2021-05-01"]
    aprCases21 = cases["All"]["dates"]["2021-04-30"] - cases["All"]["dates"]["2021-04-01"]
    marCases21 = cases["All"]["dates"]["2021-03-31"] - cases["All"]["dates"]["2021-03-01"]
    febCases21 = cases["All"]["dates"]["2021-02-28"] - cases["All"]["dates"]["2021-02-01"]
    janCases21 = cases["All"]["dates"]["2021-01-31"] - cases["All"]["dates"]["2021-01-01"]

    decCases20 = cases["All"]["dates"]["2020-12-31"] - cases["All"]["dates"]["2020-12-01"]
    novCases20 = cases["All"]["dates"]["2020-11-30"] - cases["All"]["dates"]["2020-11-01"]
    octCases20 = cases["All"]["dates"]["2020-10-31"] - cases["All"]["dates"]["2020-10-01"]
    sepCases20 = cases["All"]["dates"]["2020-09-30"] - cases["All"]["dates"]["2020-09-01"]
    augCases20 = cases["All"]["dates"]["2020-08-31"] - cases["All"]["dates"]["2020-08-01"]
    julCases20 = cases["All"]["dates"]["2020-07-31"] - cases["All"]["dates"]["2020-07-01"]
    junCases20 = cases["All"]["dates"]["2020-06-30"] - cases["All"]["dates"]["2020-06-01"]
    mayCases20 = cases["All"]["dates"]["2020-05-31"] - cases["All"]["dates"]["2020-05-01"]
    aprCases20 = cases["All"]["dates"]["2020-04-30"] - cases["All"]["dates"]["2020-04-01"]
    marCases20 = cases["All"]["dates"]["2020-03-31"] - cases["All"]["dates"]["2020-03-01"]
    febCases20 = cases["All"]["dates"]["2020-02-29"] - cases["All"]["dates"]["2020-02-01"]
    janCases20 = cases["All"]["dates"]["2020-01-31"] - cases["All"]["dates"]["2020-01-22"]

    casesTimeline["01-20"] = janCases20
    casesTimeline["02-20"] = febCases20
    casesTimeline["03-20"] = marCases20
    casesTimeline["04-20"] = aprCases20
    casesTimeline["05-20"] = mayCases20
    casesTimeline["06-20"] = junCases20
    casesTimeline["07-20"] = julCases20
    casesTimeline["08-20"] = augCases20
    casesTimeline["09-20"] = sepCases20
    casesTimeline["10-20"] = octCases20
    casesTimeline["11-20"] = novCases20
    casesTimeline["12-20"] = decCases20

    casesTimeline["01-21"] = janCases21
    casesTimeline["02-21"] = febCases21
    casesTimeline["03-21"] = marCases21
    casesTimeline["04-21"] = aprCases21
    casesTimeline["05-21"] = mayCases21
    casesTimeline["06-21"] = junCases21
    casesTimeline["07-21"] = julCases21
    casesTimeline["08-21"] = augCases21
    casesTimeline["09-21"] = sepCases21
    casesTimeline["10-21"] = octCases21
    casesTimeline["11-21"] = novCases21
    casesTimeline["12-21"] = decCases21

    casesTimeline["01-22"] = janCases22
    casesTimeline["02-22"] = febCases22
    casesTimeline["03-22"] = marCases22

    return casesTimeline


globalCovidData()