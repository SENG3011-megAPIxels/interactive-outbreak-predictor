import pytest
import requests
import json

url_report = 'https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/report?'

def test_success_report():
        report_id = 1
        response = requests.get(f'{url_report}report_id={report_id}')
        assert response.status_code == 200
        body = get_body(response)
        assert body["report_id"] == report_id

def test_additional_report_id():
    '''
    Tests that various types of report ID's are showing the correct exceptions
    Tests that a valid report ID gives the correct body
    '''
    report_id1 = 10587
    report_id2 = None
    report_id3 = 1
    report_id4 = -10
    report_id5 = 'hello'
    report_id6 = 26
    report_id7 = 54

    response_1 = requests.get(f'{url_report}report_id={report_id1}')
    json_response_1 = response_1.json()
    assert json_response_1['errorMessage'] == "Error: not a valid report ID"
    assert json_response_1['errorType'] == 'Exception'

    response_2 = requests.get(f'{url_report}report_id={report_id2}')
    json_response_2 = response_2.json()
    assert json_response_2['errorMessage'] == 'Error: invalid report_id'
    assert json_response_2['errorType'] == 'Exception'

    response_3 = requests.get(f'{url_report}report_id={report_id3}')
    json_response_3 = response_3.json()
    assert json_response_3['errorMessage'] == 'Error: not a valid report ID'
    assert json_response_3['errorType'] == 'Exception'

    response_4 = requests.get(f'{url_report}report_id={report_id4}')
    json_response_4 = response_4.json()
    assert json_response_4['errorMessage'] == 'Error: invalid report_id'
    assert json_response_4['errorType'] == 'Exception'

    response_5 = requests.get(f'{url_report}report_id={report_id5}')
    json_response_5 = response_5.json()
    assert json_response_5['errorMessage'] == 'Error: invalid report_id'
    assert json_response_5['errorType'] == 'Exception'
    
    response_6 = requests.get(f'{url_report}report_id={report_id6}')
    json_response_6 = response_6.json()
    assert json_response_6['statusCode'] == 200
    assert json_response_6['headers'] == {"Content-Type": "application/json"}
    assert json_response_6['body'] == "{\"report_id\": 26, \"article_id\": \"8701888\", \"report\": {\"diseases\": [\"tuberculosis\"], \"locations\": [\"brazil\", \"gravatai\", \"rio grande\", \"usa\", \"ireland\", \"lima\", \"ne\"], \"syndromes\": [], \"event_date\": [\"2022-03-18 00:00:00\", \"2017-03-18 00:00:00\", \"2021-03-18 00:00:00\", \"2018-03-18 00:00:00\", \"2022-03-08 00:00:00\", \"2014-03-18 00:00:00\", \"2022-03-06 00:00:00\", \"2022-03-05 00:00:00\", \"2022-03-04 00:00:00\", \"2022-03-03 00:00:00\", \"2022-03-02 00:00:00\", \"2009-03-18 00:00:00\", \"2022-03-11 00:00:00\", \"2022-03-09 00:00:00\"]}}"

    response_7 = requests.get(f'{url_report}report_id={report_id7}')
    json_response_7 = response_7.json()
    assert json_response_7['statusCode'] == 200
    assert json_response_7['headers'] == {"Content-Type": "application/json"}
    assert json_response_7['body'] == "{\"report_id\": 54, \"article_id\": \"8701696\", \"report\": {\"diseases\": [\"salmonellosis\"], \"locations\": [\"west virginia\", \"abbott\", \"sturgis\", \"z2\", \"usa\", \"tennessee\", \"united states\"], \"syndromes\": [\"Meningitis\"], \"event_date\": [\"2022-03-02 00:00:00\", \"2022-02-18 00:00:00\", \"2022-01-02 00:00:00\", \"2022-03-18 00:00:00\", \"2001-03-18 00:00:00\", \"2002-03-18 00:00:00\", \"1990-03-18 00:00:00\", \"2004-03-18 00:00:00\", \"2005-03-18 00:00:00\"]}}"

def get_body(response):
    json_response = response.json()
    print(json_response)
    return json.loads(json_response['body'])
