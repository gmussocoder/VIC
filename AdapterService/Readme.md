AdapterService:
The AdapterService has tha capabilitie of poolling each MODBUS Device Slave; it's a Modbus TCP Client. The Modbus TCP devices are servers (slaves) which will bring their Holding Register to be read or written by the Modbus TCP Client. 
The AdapterService MODBUS TCP interface must be connected in the same network LAN where are connected the Modbus TCP devices.
It must be offer 1024 ports for 1024 modbus TCP devices. 