# -*- coding: utf-8 -*-
import scrapy
import json
import re
from datetime import date
from scrapy.crawler import CrawlerProcess

class ProMedSpider(scrapy.Spider):
    name = 'ProMed'
    start_urls = ['https://promedmail.org/']
    url = 'https://promedmail.org/wp-admin/admin-ajax.php'

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

        today = date.today()
        year = today.year
        
        while year >= 2010:
            body = f'action=get_latest_posts&edate={year}&return_map=1&feed_id=1&seltype=latest'

            yield scrapy.Request(self.url, callback=self.parse_api, method='POST', headers=self.headers, body=body, dont_filter=True)

            year = year - 1
        
        
    def parse_api(self, response):
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
        data['content'] = content

        with open('response.json', 'a') as outfile:
            json.dump(data, outfile)

process = CrawlerProcess()
process.crawl(ProMedSpider)
process.start()





