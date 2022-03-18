import pytest
import requests
import json

url = 'https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/article?'

def test_success_article():
        response = requests.get(f'{url}article_id=8701991')
        assert response.status_code == 200
        
def test_additional_article_id():
    '''
    Tests that various invalid article ID examples show the correct exception message
    Tests that valid article ID's show the correct body and status code
    '''

    article_id1 = 76483
    article_id2 = None
    article_id3 = 0
    article_id4 = 'Hello'
    article_id5 = 8701659
    article_id6 = 8701991

    response_1 = requests.get(f'{url_article}article_id={article_id1}')
    json_response_1 = response_1.json()
    assert json_response_1['errorMessage'] == "Error: invalid article_id"
    assert json_response_1['errorType'] == 'Exception'
    
    response_2 = requests.get(f'{url_article}article_id={article_id2}')
    json_response_2 = response_2.json()
    assert json_response_2['errorMessage'] == "Error: invalid article_id"
    assert json_response_2['errorType'] == 'Exception'

    response_3 = requests.get(f'{url_article}article_id={article_id3}')
    json_response_3 = response_3.json()
    assert json_response_3['errorMessage'] == "Error: invalid article_id"
    assert json_response_3['errorType'] == 'Exception'

    response_4 = requests.get(f'{url_article}article_id={article_id4}')
    json_response_4 = response_4.json()
    assert json_response_4['errorMessage'] == "Error: invalid article_id"
    assert json_response_4['errorType'] == 'Exception'

    response_5 = requests.get(f'{url_article}article_id={article_id5}')
    json_response_5 = response_5.json()
    assert json_response_5['statusCode'] == 200
    assert json_response_5['headers'] == {"Content-Type": "application/json"}
    assert json_response_5['body'] == '{\"url\": \"https://promedmail.org/promed-post/?id=8701659\", \"date_of_publication\": \"2022-02-26 03:40:32\", \"headline\": \"PRO/AH/EDR> Hantavirus and COVID-19 co-infection - Americas: (Argentina)\", \"main_text\": [\"infection\", \"fever\", \"virus\", \"infectious\", \"illness\", \"emerging\", \"hantavirus\"], \"reports\": [{\"report_id\": \"8701659\", \"report\": {\"diseases\": [\"hantavirus\", \"sars\", \"COVID-19\"], \"locations\": [\"periolo n\", \"argentina\", \"usa\", \"uk\", \"italy\", \"se\"], \"syndromes\": [\"Acute respiratory syndrome\"], \"event_date\": [\"2022-02-18 00:00:00\", \"2020-03-18 00:00:00\", \"2022-03-18 00:00:00\", \"2020-11-18 00:00:00\", \"2038-03-18 00:00:00\", \"2022-03-03 00:00:00\", \"2022-03-02 00:00:00\", \"2022-03-08 00:00:00\"]}}]}'

    response_6 = requests.get(f'{url_article}article_id={article_id6}')
    json_response_6 = response_6.json()
    assert json_response_6['statusCode'] == 200
    assert json_response_6['headers'] == {"Content-Type": "application/json"}
    assert json_response_6['body'] == '{\"url\": \"https://promedmail.org/promed-post/?id=8701991\", \"date_of_publication\": \"2022-03-15 02:09:42\", \"headline\": \"PRO/AH/EDR> E. coli EHEC - France (02): hemolytic uremic syndrome, fatal\", \"main_text\": [\"outbreak\", \"infection\", \"infectious\", \"bacteria\"], \"reports\": [{\"report_id\": \"8701991\", \"report\": {\"diseases\": [\"ehec\", \"e.coli\"], \"locations\": [\"france\", \"england\"], \"syndromes\": [], \"event_date\": [\"2022-03-02 00:00:00\", \"2022-03-18 00:00:00\", \"2022-03-19 00:00:00\", \"2022-03-12 00:00:00\", \"2022-03-03 00:00:00\", \"2022-03-04 00:00:00\", \"2020-03-18 00:00:00\", \"2019-03-18 00:00:00\"]}}]}'    

def get_body(response):
    json_response = response.json()
    print(json_response)
    return json.loads(json_response['body'])
