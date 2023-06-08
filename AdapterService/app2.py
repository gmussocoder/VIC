#AdapterService
import requests
import json
from pyModbusTCP.server import ModbusServer, DataBank
from time import sleep
from random import uniform
import cv2

server = ModbusServer("192.168.0.27", 12345, no_block=True)

try:
    print("Start Server...")
    server.start()
    print("Server is online")
    state = int(0)
    while True:
#        server.data_bank.set_holding_registers(0, [int(uniform(0, 100))])
#        server.data_bank.set_holding_registers(1, [int(uniform(0, 100))])
        new_state = server.data_bank.get_holding_registers(0, 3)
        if state != new_state[2]:
            print(state)
            print("Value of register 1: ", new_state[0])
            print("Value of register 2: ", new_state[1])
            print("Value of register 3: ", new_state[2])            
            # Prepare the data for the HTTP POST request
            data = {
                "manifestId": new_state[1],
                "imageUrl": "C:/Guille/VIC/Desarrollo/pythonEnv/image.jpeg",
                "plcId": new_state[0]
            }
            headers = {'Content-type': 'application/json'}
            state = new_state[2]
            print(state)

            # Open the camera
            camera = cv2.VideoCapture(0)

            # Check if the camera is opened successfully
            if not camera.isOpened():
                print("Failed to open the camera")
                exit()

            # Capture an image from the camera
            ret, frame = camera.read()

            # Check if the image capture was successful
            if not ret:
                print("Failed to capture image from the camera")
                camera.release()
                exit()

            # Save the captured image to a file
            image_path = "C:/Guille/VIC/Desarrollo/pythonEnv/image.jpeg"
            cv2.imwrite(image_path, frame)

            print("Image captured and saved to:", image_path)

            # Release the camera
            camera.release()
            # Make the HTTP POST request to another system
            response = requests.post("http://192.168.0.27:4000/RuntimeService/V1/inference", data=json.dumps(data), headers=headers)
            print("HTTP POST response:", response.status_code)

        sleep(4)
except:
    print("Studdown server...")
    server.stop()
    print("Server is offline")