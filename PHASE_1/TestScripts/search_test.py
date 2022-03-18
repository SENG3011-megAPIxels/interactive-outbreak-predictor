import pytest
import requests
import json

url_search = 'https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/search?'

def test_success_search_no_key_terms():
        response = requests.get(f'{url_search}start_date=2022-03-05&end_date=2022-03-07&key_terms=null&location=USA')
        assert response.status_code == 200
        body = get_body(response)
        date = body[0]['date_of_publication']
        # date within range
        assert date > '2022-03-05' and date < '2022-03-07'
        assert 'promed' in body[0]['url']

def test_success_search_one_key_term():
    response = requests.get(f'{url_search}start_date=2019-03-05&end_date=2022-03-07&key_terms=measles&location=USA')
    assert response.status_code == 200
    body = get_body(response)
    for article in body:
        assert 'measles' in article['key_terms']

def test_success_search_two_key_terms():
    response = requests.get(f'{url_search}start_date=2019-03-02&end_date=2022-03-04&key_terms=measles&key_terms=outbreak&location=usa')
    assert response.status_code == 200
    body = get_body(response)
    # measles and outbreak in each article's key terms
    for article in body:
        assert all(term in article['key_terms'] for term in ('measles','outbreak'))

def test_no_date_search():
    response = requests.get(f'{url_search}key_terms=null')
    # assert response.status_code == 500

def test_locations():
    country_1 = 'Australia'
    country_2 = 'New Zealand'
    country_3 = 'Canada'

    response_1 = requests.get(f'{url_search}start_date=2019-03-02&end_date=2022-03-04&key_terms=outbreak&location={country_1}]')
    assert response_1.status_code == 200
    body = get_body(response_1)
    for article in body:
        assert 'Australia' in article['location']
        
def get_body(response):
    json_response = response.json()
    print(json_response)
    return json.loads(json_response['body'])
