# dragonbackend
NodeJS backend for controlling Dragon Robot
Install: npm install  
Start using: node server.js
Runs 2 servers. HTTP Server (built with Express) on port 5090 and a TCP server on port 5091.

The HTTP Server supports 3 requests
/move?dirDeg=[360 degree direction]&speed=[value from 0 to 1024]
/stop
/status

The TCPServer communicates via JSON. Basic structure: {'action': ..., ...}
The currently supporting actions: sync, stop and move (supply fields dirDeg and speed in JSON).