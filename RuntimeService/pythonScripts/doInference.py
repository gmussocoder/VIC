import sys
import time
import json
import sys
import cv2
sys.path.append('C:/Guille/VIC/Desarrollo/RuntimeService/pythonScripts')

# import the modules
from processImage import processImage
from dbUtils import updateResults
from httpUtils import sendPostRequest

jobId = sys.argv[1]
print("El JobId es: ", jobId)
imageUrl = sys.argv[2]
modelPath = sys.argv[3]
manifestId = sys.argv[4]
plcId = sys.argv[5]
# Process the image
image, personCount, results = processImage(imageUrl, modelPath)

# Save the image with detections
current_time = time.strftime("%Y%m%d_%H%M%S")
output_path = f'C:/Guille/VIC/Desarrollo/pythonEnv/{jobId}_{manifestId}_result_{current_time}.jpeg'
cv2.imwrite(output_path, image)
print(f"Image saved at: {output_path}")

# Create a JSON object with the results
json_data = {
    'jobId': jobId,
    'manifestId': manifestId,
    'personCount': personCount,
    'results': results
}

# Convert the JSON object to a string
json_string = json.dumps(json_data)

# Update the results in the database
updateResults(jobId, results)

# API Adapter
#urlAdapter = "http://200.42.4.38:1880/gmusso/callback/adapter"
urlAdapter ="http://192.168.0.27:4002/AdapterService/v1/iresults"
# Create the JSON payload with the personCount variable
payload = {"jobId": jobId, "personCount": personCount, "plcId": plcId}

# Define the headers
headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no cache'
}

# Send the POST request with headers
sendPostRequest(urlAdapter, payload, headers)

# Print the JSON string
print(json_string)