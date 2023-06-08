import sys
from time import sleep

sys.path.append('C:/Guille/VIC/Desarrollo/AdapterService')

from Controllers.PY.modbusServer import run_modbus_server

def main():
    host = "192.168.0.27"
    port = 12345
    url = "http://192.168.0.27:4000/RuntimeService/V1/inference"

    run_modbus_server(host, port, url)

if __name__ == "__main__":
    main()