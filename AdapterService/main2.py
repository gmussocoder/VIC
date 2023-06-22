import threading
import sys
sys.path.append('C:/Guille/VIC/Desarrollo/AdapterService')
from poller import threadClientModbusPooller
from flask import Flask, request

app = Flask(__name__)

def handle_http_post(jobIdsResults):
    jobIdResult = request.json
    jobIdsResults[jobIdResult["jobId"]] = jobIdResult
    print(jobIdResult)
    return 'HTTP POST request processed'

def run_modbus_threads(slaveIPs, port, addressRegister, url, jobIdsResults):
    threads = []
    for slaveIP in slaveIPs:
        current_thread = threading.Thread(target=threadClientModbusPooller, args=(slaveIP, port, addressRegister, url, jobIdsResults))
        threads.append(current_thread)
    for thread in threads:
        thread.start()

@app.route('/AdapterService/v1/iresults', methods=['POST'])
def process_http_post():
    return handle_http_post(app.config['jobIdsResults'])

if __name__ == '__main__':
    jobIdsResults = {}
    app.config['jobIdsResults'] = jobIdsResults

    slaveIPs = ["192.168.0.225"]
    port = 5020
    addressRegister = 1
    url = "http://192.168.0.27:4000/RuntimeService/V1/inference"

    run_modbus_threads(slaveIPs, port, addressRegister, url, jobIdsResults)

    app.run(host='0.0.0.0', port=4002)