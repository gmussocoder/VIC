from pyModbusTCP.server import ModbusServer

def run_modbus_server(host, port_start, num_slaves):
    servers = []

    try:
        print("Start Server...")
        for i in range(num_slaves):
            server = ModbusServer(host=host, port=port_start + i, no_block=True)
            servers.append(server)
            server.start()
            print(f"Modbus Server for Slave {i+1} is online on port {port_start + i}")

        while True:
            # Add your logic or processing here...

            pass

    except Exception as e:
        print("Error:", e)

    finally:
        print("Shutdown servers...")
        for server in servers:
            server.stop()
        print("Servers are offline")

if __name__ == "__main__":
    host = "192.168.0.27"    # Replace with your desired host
    port_start = 5020     # Replace with the starting port number
    num_slaves = 2        # Replace with the number of Modbus slaves

    run_modbus_server(host, port_start, num_slaves)