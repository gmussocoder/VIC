import sys
from time import sleep
import threading
from pyModbusTCP.server import ModbusServer
from utils.PY.httpRequests import send_http_post
from waitress import serve

sys.path.append('C:/Guille/VIC/Desarrollo/AdapterService')
from Controllers.PY.captureImage import capture_image
from flask import Flask, request, jsonify

def run_modbus_server(host, port, url):
    server = ModbusServer(host, port, no_block=True)

    # Flag to track if the listening process is active
    listening_active = True

    app = Flask(__name__)

    @app.route('/AdapterService/V1/ijobsresults', methods=['POST'])
    def receive_post():
        nonlocal listening_active

        # Process the first received HTTP POST request
        if listening_active:
            data = request.json
            print("Received POST data:", data)

            # Perform necessary processing on the received data
            # ...

            # Check if holding registers need to be set
            if data.get("set_registers"):
                registers = data.get("registers")
                if registers:
                    server.data_bank.set_holding_registers(0, registers)

            # Deactivate the listening process after processing the first request
            listening_active = False

            return jsonify({'message': 'Success'}), 200
        else:
            return jsonify({'message': 'Listening process deactivated'}), 400

    def listening_process():
        serve(app, host='0.0.0.0', port=8000)

    try:
        print("Start Server...")
        server.start()
        print("Server is online")
        state = int(0)

        # Start the listening process in a separate thread
        listening_thread = threading.Thread(target=listening_process)
        listening_thread.start()

        while True:
            new_state = server.data_bank.get_holding_registers(0, 3)
            if state != new_state[2]:
                print(state)
                print("Value of register 1: ", new_state[0])
                print("Value of register 2: ", new_state[1])
                print("Value of register 3: ", new_state[2])

                capture_image("C:/Guille/VIC/Desarrollo/pythonEnv/image.jpeg")

                # Prepare the data for the HTTP POST request
                data = {
                    "manifestId": new_state[1],
                    "imageUrl": "C:/Guille/VIC/Desarrollo/pythonEnv/image.jpeg",
                    "plcId": new_state[0]
                }

                # Make the HTTP POST request to RuntimeService
                response = send_http_post(url, data)
                print("HTTP POST response:", response.status_code)
                listening_thread.start()
                # Process the new state here...
                state = new_state[2]
                print(state)

            # Add any other processing or logic here...

            sleep(4)
    except:
        print("Shutdown server...")
        server.stop()
        print("Server is offline")

if __name__ == "__main__":
    host = "192.168.0.27"
    port = 12345
    url = "http://192.168.0.27:4000/RuntimeService/V1/inference"

    run_modbus_server(host, port, url)