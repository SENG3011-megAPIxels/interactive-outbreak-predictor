import pytest
import requests
import json

url = 'https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/article?'

def test_success_article():
        response = requests.get(f'{url}article_id=8701991')
        assert response.status_code == 200

def get_body(response):
    json_response = response.json()
    print(json_response)
    return json.loads(json_response['body'])