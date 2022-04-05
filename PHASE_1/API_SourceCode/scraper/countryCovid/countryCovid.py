import json
import psycopg2
import requests
import csv
import re

def countryCovidData():
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
            else:
                cca3 = data[0]["cca3"]
        except KeyError:
            continue

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

        caseDict = createTimeline(cases[country])
        deathsTimeline = createTimeline(deaths[country])

        for region in caseDict:
            regionDict = {}
            for month in caseDict[region]:
                monthDict = {}
                monthDict['newCases'] = caseDict[region][month]
                monthDict['newDeaths'] = deathsTimeline[region][month]
                  
                regionDict[month] = monthDict
            countryDict[region] = regionDict    
        
        if cca3 not in allData:
            allData[cca3] = countryDict
    
    with open('data.json', 'w') as f:
        json.dump(allData, f)

def createTimeline(cases):
    casesTimeline = {}

    for case in cases:
        caseDict = {}
        marCases22 = cases[case]["dates"]["2022-03-31"] - cases[case]["dates"]["2022-03-01"]
        febCases22 = cases[case]["dates"]["2022-02-28"] - cases[case]["dates"]["2022-02-01"]
        janCases22 = cases[case]["dates"]["2022-01-31"] - cases[case]["dates"]["2022-01-01"]

        decCases21 = cases[case]["dates"]["2021-12-31"] - cases[case]["dates"]["2021-12-01"]
        novCases21 = cases[case]["dates"]["2021-11-30"] - cases[case]["dates"]["2021-11-01"]
        octCases21 = cases[case]["dates"]["2021-10-31"] - cases[case]["dates"]["2021-10-01"]
        sepCases21 = cases[case]["dates"]["2021-09-30"] - cases[case]["dates"]["2021-09-01"]
        augCases21 = cases[case]["dates"]["2021-08-31"] - cases[case]["dates"]["2021-08-01"]
        julCases21 = cases[case]["dates"]["2021-07-31"] - cases[case]["dates"]["2021-07-01"]
        junCases21 = cases[case]["dates"]["2021-06-30"] - cases[case]["dates"]["2021-06-01"]
        mayCases21 = cases[case]["dates"]["2021-05-31"] - cases[case]["dates"]["2021-05-01"]
        aprCases21 = cases[case]["dates"]["2021-04-30"] - cases[case]["dates"]["2021-04-01"]
        marCases21 = cases[case]["dates"]["2021-03-31"] - cases[case]["dates"]["2021-03-01"]
        febCases21 = cases[case]["dates"]["2021-02-28"] - cases[case]["dates"]["2021-02-01"]
        janCases21 = cases[case]["dates"]["2021-01-31"] - cases[case]["dates"]["2021-01-01"]

        decCases20 = cases[case]["dates"]["2020-12-31"] - cases[case]["dates"]["2020-12-01"]
        novCases20 = cases[case]["dates"]["2020-11-30"] - cases[case]["dates"]["2020-11-01"]
        octCases20 = cases[case]["dates"]["2020-10-31"] - cases[case]["dates"]["2020-10-01"]
        sepCases20 = cases[case]["dates"]["2020-09-30"] - cases[case]["dates"]["2020-09-01"]
        augCases20 = cases[case]["dates"]["2020-08-31"] - cases[case]["dates"]["2020-08-01"]
        julCases20 = cases[case]["dates"]["2020-07-31"] - cases[case]["dates"]["2020-07-01"]
        junCases20 = cases[case]["dates"]["2020-06-30"] - cases[case]["dates"]["2020-06-01"]
        mayCases20 = cases[case]["dates"]["2020-05-31"] - cases[case]["dates"]["2020-05-01"]
        aprCases20 = cases[case]["dates"]["2020-04-30"] - cases[case]["dates"]["2020-04-01"]
        marCases20 = cases[case]["dates"]["2020-03-31"] - cases[case]["dates"]["2020-03-01"]
        febCases20 = cases[case]["dates"]["2020-02-29"] - cases[case]["dates"]["2020-02-01"]
        janCases20 = cases[case]["dates"]["2020-01-31"] - cases[case]["dates"]["2020-01-22"]

        caseDict["01-20"] = abs(janCases20)
        caseDict["02-20"] = abs(febCases20)
        caseDict["03-20"] = abs(marCases20)
        caseDict["04-20"] = abs(aprCases20)
        caseDict["05-20"] = abs(mayCases20)
        caseDict["06-20"] = abs(junCases20)
        caseDict["07-20"] = abs(julCases20)
        caseDict["08-20"] = abs(augCases20)
        caseDict["09-20"] = abs(sepCases20)
        caseDict["10-20"] = abs(octCases20)
        caseDict["11-20"] = abs(novCases20)
        caseDict["12-20"] = abs(decCases20)

        caseDict["01-21"] = abs(janCases21)
        caseDict["02-21"] = abs(febCases21)
        caseDict["03-21"] = abs(marCases21)
        caseDict["04-21"] = abs(aprCases21)
        caseDict["05-21"] = abs(mayCases21)
        caseDict["06-21"] = abs(junCases21)
        caseDict["07-21"] = abs(julCases21)
        caseDict["08-21"] = abs(augCases21)
        caseDict["09-21"] = abs(sepCases21)
        caseDict["10-21"] = abs(octCases21)
        caseDict["11-21"] = abs(novCases21)
        caseDict["12-21"] = abs(decCases21)

        caseDict["01-22"] = abs(janCases22)
        caseDict["02-22"] = abs(febCases22)
        caseDict["03-22"] = abs(marCases22)
        casesTimeline[case] = caseDict

    return casesTimeline


countryCovidData()