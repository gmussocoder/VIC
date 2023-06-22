import requests
import json

def send_http_post(url, data):
    headers = {'Content-type': 'application/json'}
    response = requests.post(url, data=json.dumps(data), headers=headers)
    print("HTTP POST response:", response.status_code)

    if response.status_code == 201:  # Verify  if thie request was OK
        payload = response.content  # Get the payload from the response
        # store the payload:
        print(payload)
        payload_data = json.loads(payload)
        print(payload_data)
        return payload_data