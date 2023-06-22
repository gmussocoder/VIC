import threading
import sys
sys.path.append('C:/Guille/VIC/Desarrollo/AdapterService')
from poller import threadClientModbusPooller
from flask import Flask, request	
app = Flask(__name__)

jobIdsResults={}

threads = []

url = "http://192.168.0.27:4000/RuntimeService/V1/inference"

slaveIPs = ["192.168.0.225"]
port = 5020
addressRegister = 0 # parametros de cada conexion

for slaveIP in slaveIPs:
	current_thread = threading.Thread(target=threadClientModbusPooller, args=(slaveIP, port, addressRegister, url, jobIdsResults))
	threads.append(current_thread)
for thread in threads:
	thread.start()

@app.route('/AdapterService/v1/iresults', methods=['POST'])
def handle_http_post():
    jobIdResult = request.json
    global jobIdsResults
    jobIdsResults[jobIdResult["jobId"]]= jobIdResult
    print(jobIdResult)
    return 'HTTP POST request processed'
"""
def process_http_post(data):
    # Process the HTTP POST request here
    # You can access the payload using the `data` parameter
    # Example code to handle the request
    print("Received HTTP POST request:", data)
    # Perform necessary actions based on the request
    # ...
"""
# Ejecutar el servidor Flask en el hilo principal
app.run(host='0.0.0.0', port=4002)
