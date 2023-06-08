import requests
import json

def send_http_post(url, data):
    headers = {'Content-type': 'application/json'}
    response = requests.post(url, data=json.dumps(data), headers=headers)
    print("HTTP POST response:", response.status_code)