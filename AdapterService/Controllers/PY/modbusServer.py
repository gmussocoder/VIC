import sys
from time import sleep
from pyModbusTCP.server import ModbusServer
sys.path.append('C:/Guille/VIC/Desarrollo/AdapterService')
from Controllers.PY.captureImage import capture_image
from utils.PY.httpRequests import send_http_post
def run_modbus_server(host, port, url):
    server = ModbusServer(host, port, no_block=True)
    try:
        print("Start Server...")
        server.start()
        print("Server is online")
        state = int(0)
        while True:
            new_state = server.data_bank.get_holding_registers(0, 3)
            if state != new_state[2]:
#                print(server.ModbusService.client_address)
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

                send_http_post(url,data)
                # Process the new state here...

                state = new_state[2]
                print(state)

            # Add any other processing or logic here...

            sleep(4)
    except:
        print("Shutdown server...")
        server.stop()
        print("Server is offline")