from pyModbusTCP.server import ModbusServer

class MyModbusServer(ModbusServer):
    def handle(self, tcp_sock, tcp_client):
        # Read the Modbus request from the client
        request = tcp_sock.recv(1024)

        # Extract the slave address from the Modbus request
        slave_address = request[6]

        # Check if the request is from the desired slave address
        if slave_address == YOUR_SLAVE_ADDRESS:
            # Handle the Modbus request from the specific slave address
            # ...
            print(f"Received Modbus request from slave address {slave_address}")

        # Call the parent's handle method to handle the request
        super().handle(tcp_sock, tcp_client)

if __name__ == "__main__":
    # Define your slave address to monitor
    YOUR_SLAVE_ADDRESS = 1

    # Instantiate your custom Modbus server
    server = MyModbusServer(host="192.168.0.27", port=5020)

    # Start the server
    print("Modbus server is running...")
    server.start()
