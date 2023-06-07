import requests

def sendPostRequest(url, payload, headers):
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 200:
        print("POST request successful")
    else:
        print("POST request failed")