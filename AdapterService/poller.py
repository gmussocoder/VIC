from pyModbusTCP.client import ModbusClient
import sys
sys.path.append('C:/Guille/VIC/Desarrollo/AdapterService')
from Controllers.PY.captureImage import capture_image
from utils.PY.httpRequests import send_http_post
import time

#data_queue = Queue()  # Queue data shared
#jobIdsResults = {}  # Dictionary for store the registers values

def threadClientModbusPooller(slaveIP, port, addressRegister, url, jobIdsResults):
    client = ModbusClient(host=slaveIP, port=port)
    timestampEvent = 0
    client.open()
    while True:
        readData = client.read_holding_registers(addressRegister, 5)
        print("Current register value for {}: {}".format(slaveIP, readData))
                # Store Register values in the dictionary
        time.sleep(1)
        if (int(readData[0]) == 1) and (int(readData[1]) != timestampEvent):
            timestampEvent = int(readData[1])
            capture_image("C:/Guille/VIC/Desarrollo/pythonEnv/image.jpeg")
            data = {
                "manifestId": int(readData[2]),
                "imageUrl": "C:/Guille/VIC/Desarrollo/pythonEnv/image.jpeg",
                "plcId": int(readData[3])
            }
            requestForVicJob = send_http_post(url, data)
            print("Request for VIC Sent")
            print(requestForVicJob)
            requestForVicJobId = requestForVicJob["job"]["id"]
            waitForVic = True
            while waitForVic:
                time.sleep(2)
                print("Waiting for VIC Results ...")
                if requestForVicJobId in jobIdsResults:
                    print("Vic Results received")              
                    personCount = jobIdsResults[requestForVicJobId]["personCount"]
                    print("Writing Holding Registers...")
                    variable = client.write_multiple_registers(1, [int(2), timestampEvent, readData[2], readData[3], int(personCount)]) #[requestForVIC, timestamp, manifestId, plcId, result]
                    print("Write Holding register Verification: ", variable)
                    jobIdsResults.pop(requestForVicJobId)
                    waitForVic = False
        time.sleep(4)