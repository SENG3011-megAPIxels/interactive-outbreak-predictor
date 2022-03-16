import pytest
import requests
import json

url = 'https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/report?'

def test_success_report():
        report_id = 1
        response = requests.get(f'{url}report_id={report_id}')
        assert response.status_code == 200
        body = get_body(response)
        assert body["report_id"] == report_id

def test_success_report_with_same_article_id():
    report_id1 = 1
    report_id2 = 2
    response1 = requests.get(f'{url}report_id={report_id1}')
    response2 = requests.get(f'{url}report_id={report_id2}')
    assert response1.status_code == 200 and response2.status_code == 200
    body1 = get_body(response1)
    body2 = get_body(response2)
    assert body1["report_id"] == report_id1 and body2["report_id"] == report_id2
    assert body1["article_id"] == body2["article_id"]

def get_body(response):
    json_response = response.json()
    print(json_response)
    return json.loads(json_response['body'])