import sys
import tensorflow as tf
import cv2
import numpy as np
import time
import json
import sqlite3
import requests

jobId = sys.argv[1]
print("El JobId es: ", jobId)
imageUrl = sys.argv[2]
modelPath = sys.argv[3]
manifestId = sys.argv[4]

print("El JobId es: ", jobId)

model = tf.saved_model.load(modelPath)

inference_fn = model.signatures['serving_default']

image = cv2.imread(imageUrl)

input_tensor = tf.convert_to_tensor(image)
input_tensor = input_tensor[tf.newaxis, ...]

detections = inference_fn(input_tensor)

boxes = detections['detection_boxes'][0].numpy()
classes = detections['detection_classes'][0].numpy().astype(np.int32)
scores = detections['detection_scores'][0].numpy()

confidence_threshold = 0.5
personCount = 0

results = []

for i in range(boxes.shape[0]):
    if scores[i] > confidence_threshold and classes[i] == 1:
        ymin, xmin, ymax, xmax = boxes[i]

        height, width, _ = image.shape
        xmin = int(xmin * width)
        xmax = int(xmax * width)
        ymin = int(ymin * height)
        ymax = int(ymax * height)

        cv2.rectangle(image, (xmin, ymin), (xmax, ymax), (0, 255, 0), 2)
        cv2.putText(image, 'Person', (xmin, ymin - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
        personCount += 1

        # Add bounding box coordinates to the results
        result = {
            'xmin': xmin,
            'ymin': ymin,
            'xmax': xmax,
            'ymax': ymax
        }
        results.append(result)

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

# Connect to the database
db_connection = sqlite3.connect('Jobs.db')
db_cursor = db_connection.cursor()

# Update the results in the ijobs table
update_query = "UPDATE ijobs SET results = ? WHERE jobId = ?"
db_cursor.execute(update_query, (json.dumps(results), jobId))

# Commit the changes and close the database connection
db_connection.commit()
db_connection.close()

# API Adapter
urlAdapter = "http://200.42.4.38:1880/gmusso/callback/adapter"

# Create the JSON payload with the personCount variable
payload = {"personCount": personCount}

# Define the headers
headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no cache'
}

# Send the POST request with headers
response = requests.post(urlAdapter, json=payload, headers=headers)
# Check the response status code
if response.status_code == 200:
    print("POST request successful")
else:
    print(f"POST request failed")
# Print the JSON string
print(json_string)