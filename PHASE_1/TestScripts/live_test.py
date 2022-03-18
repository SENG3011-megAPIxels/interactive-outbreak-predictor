import pytest
import requests
import json

url_live = 'https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/live'

def test_success_api_live():
    """
    Ensures that a Status Code of 200 is returned when accessing the API
    """
    response = requests.get(url_live)
    assert response.status_code == 200
    json_response = response.json()
    assert json_response['body'] == {"version": "1.0.0", "live": "true"}
