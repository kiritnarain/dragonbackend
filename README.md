# dragonbackend
NodeJS backend for controlling Dragon Robot
Install: npm install  
Start using: node server.js
Runs 2 servers. HTTP Server (built with Express) on port 5090 and a TCP server on port 5091.

The HTTP Server supports the following request
/move?dirDeg=[360 degree direction]&speed=[value from 0 to 1024]
/stop
/resetwifi
/status

The TCPServer communicates via JSON. Basic structure: {'action': ..., ...}
The currently supporting actions: sync, stop and move (supply fields dirDeg and speed in JSON).
TCPServer sends a ping request to connected clients every 1 second which includes the last action for syncing purposes.
A typical ping request looks like {"action": "ping", "lastAction": "stop"}