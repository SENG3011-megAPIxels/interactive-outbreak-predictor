import pytest
import requests
import json

url = 'https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/search?'

def test_success_search_no_key_terms():
        response = requests.get(f'{url}start_date=2022-03-05&end_date=2022-03-07&key_terms=null')
        assert response.status_code == 200
        body = get_body(response)
        date = body[0]['date_of_publication']
        # date within range
        assert date > '2022-03-05' and date < '2022-03-07'
        assert 'promed' in body[0]['url']

def test_success_search_one_key_term():
    response = requests.get(f'{url}start_date=2022-03-05&end_date=2022-03-07&key_terms=measles')
    assert response.status_code == 200
    body = get_body(response)
    for article in body:
        assert 'measles' in article['key_terms']

def test_success_search_two_key_terms():
    response = requests.get(f'{url}start_date=2022-03-05&end_date=2022-03-07&key_terms=measles,outbreak')
    assert response.status_code == 200
    body = get_body(response)
    # measles and outbreak in each article's key terms
    for article in body:
        assert all(term in article['key_terms'] for term in ('measles','outbreak'))

def test_no_date_search():
    response = requests.get(f'{url}key_terms=null')
    # assert response.status_code == 500

def get_body(response):
    json_response = response.json()
    print(json_response)
    return json.loads(json_response['body'])