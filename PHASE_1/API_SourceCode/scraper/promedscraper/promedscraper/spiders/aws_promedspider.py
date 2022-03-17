# -*- coding: utf-8 -*-
import scrapy
import json
import re
from datetime import date
import psycopg2
import spacy
from dateutil.parser import parse 
#from scrapy.crawler import CrawlerProcess

# usage: scrapy crawl awspromed
class AWSProMedSpider(scrapy.Spider):
    name = 'awspromed'
    start_urls = ['https://promedmail.org/']
    url = 'https://promedmail.org/wp-admin/admin-ajax.php'

    keyTerms = ['Outbreak', 'Infection', 'Fever', 'Virus', 'Epidemic', 'Infectious', 'Illness', 'Bacteria', 'Emerging', 'Unknown virus', 'Mystery disease', 'Mysterious disease', 'Zika', 'MERS', 'Salmonella', 'Legionnaire', 'Measles', 'Hantavirus', 'Rift Valley Fever', 'Crimean Congo Hemorrhagic Fever Dengue', 'Ebola', 'Marburg', 'Tularemia', 'Junin Fever', 'Machupo Fever', 'Guanarito Fever', 'Chapare Fever', 'Lassa Fever', 'Lujo Fever', 'Anthrax', 'Botulism', 'Plague', 'Smallpox', 'Pox']
    diseaseList = ["anthrax cutaneous" , "anthrax gastrointestinous",  "anthrax inhalation" , "botulism", "brucellosis", "chikungunya", "chole", "cryptococcosis", "cryptosporidiosis", "crimean-congo haemorrhagic fever", "dengue", "diphteria", "ebola haemorrhagic fever", "ehec (e.coli)", "enterovirus 71 infection", "influenza a/h5n1", "influenza a/h7n9", "influenza a/h9n2", "influenza a/h1n1", "influenza a/h1n2", "influenza a/h3n5", "influenza a/h3n2", "influenza a/h2n2", "hand, foot and mouth disease", "hantavirus", "hepatitis a", "hepatitis b", "hepatitis c", "hepatitis d", "hepatitis e", "histoplasmosis", "hiv/aids", "lassa fever", "malaria", "marburg virus disease", "measles", "mers-cov", "mumps", "nipah virus", "norovirus infection", "pertussis", "plague", "pneumococcus pneumonia", "poliomyelitis", "q fever", "rabies", "rift valley fever", "rotavirus infection", "rubella", "salmonellosis", "sars", "shigellosis", "smallpox", "staphylococcal enterotoxin b", "thypoid fever", "tuberculosis", "tularemia", "vaccinia and cowpox", "varicella", "west nile virus", "yellow fever", "yersiniosis", "zika", "listeriosis", "monkeypox", "COVID-19"]
    syndromeList = ["Haemorrhagic Fever", "Acute Flacid Paralysis", "Acute gastroenteritis", "Acute respiratory syndrome", "Influenza-like illness", "Acute fever and rash", "Fever of unknown Origin", "Encephalitis", "Meningitis"]

    nlp = spacy.load('en_core_web_sm')

    headers = {
        "authority": "promedmail.org",
        "pragma": "no-cache",
        "cache-control": "no-cache",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
        "accept": "application/json, text/javascript, */*; q=0.01",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
        "sec-ch-ua-mobile": "?0",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
        "sec-ch-ua-platform": "\"Windows\"",
        "origin": "https://promedmail.org/",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        "referer": "https://promedmail.org/",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
    }


    def parse(self, response):
            body = f'action=get_latest_posts&edate=&return_map=true&feed_id=1&seltype=latest'

            yield scrapy.Request(self.url, callback=self.parse_list, method='POST', headers=self.headers, body=body, dont_filter=True)
    
        
    def parse_list(self, response):
        data = response.json()
        listview = data['listview']
        
        for id in re.findall("\d{7}", listview):
            body = f'action=get_latest_post_data&alertId={id}'

            yield scrapy.Request(self.url, callback=self.parse_info, method='POST', headers=self.headers, body=body, dont_filter=True)
        
        

    def parse_info(self, response):
        raw_data = response.json()
        data = {}

        url = raw_data['postinfo']['alert_id']
        data['url'] = f'https://promedmail.org/promed-post/?id={url}'

        title = raw_data['postinfo']['summary']
        data['title'] = title

        issue_date = raw_data['postinfo']['issue_date']
        data['issue_data'] = issue_date

        description = raw_data['postinfo']['descr'] 
        data['description'] = description

        content = raw_data['postinfo']['content']
        content = re.sub('\'', '\\\'', content)
        data['content'] = content

        matches = findKeyTerms(content)
        locations = findLocations(content)
        dates = findDates(content)
        diseases = findDiseases(content)
        syndromes = findSyndromes(content) 

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
        curr.execute(
            f"""
            INSERT INTO articles(article_id, url, title, article_date, raw_text) 
            VALUES ('{url}', '{data['url']}', '{title}', '{issue_date}', E'{content}')
            """
        )

        #curr.execute("COMMIT")
        
        with open('response.json', 'a') as outfile:
            json.dump(data, outfile)

    def findKeyTerms(rawText):
        keyTermMatches = []
        for keyTerm in keyTerms:
            match = re.findall(keyTerm, rawText, re.IGNORECASE)
            if match:
                keyTermMatches.append(keyTerm)
        return keyTermMatches

    def findDiseases(rawText):
        keyTermMatches = []
        for keyTerm in diseaseList:
            match = re.findall(keyTerm, rawText, re.IGNORECASE)
            if match:
                keyTermMatches.append(keyTerm)
        return keyTermMatches

    def findSyndromes(rawText):
        keyTermMatches = []
        for keyTerm in syndromeList:
            match = re.findall(keyTerm, rawText, re.IGNORECASE)
            if match:
                keyTermMatches.append(keyTerm)
        return keyTermMatches

    def findLocations(rawText):
        locations = []
        doc = nlp(rawText)
        for ent in doc.ents:
            if ent.label_ == "GPE":
                if ent.text not in locations:
                    locations.append(ent.text)
        return locations

    def findDates(rawText):
        dates = []
        doc = nlp(rawText)
        for ent in doc.ents:
            if ent.label_ == "DATE":
                if ent.text not in dates:
                    try:
                        dates.append(parse(ent.text))
                    except:
                        continue
        return dates


#process = CrawlerProcess()
#process.crawl(ProMedSpider)
#process.start()
