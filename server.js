const express = require('express');
const TCPServer = require('./TCPServer');
const app = express();
const HTTPServerPort = 5090;
const TCPServerPort = 5091;
//const DRAGON_PORT = 1080;
console.log('Dragonbackend initializing');

var tcpServer = new TCPServer(TCPServerPort);

app.get('/move', (req, res) => {
    const dirDeg = req.query.dirDeg;
    const speed = req.query.speed;
    var moveObj = new Object();
    moveObj.action = "move";
    moveObj.dirDeg = dirDeg;
    moveObj.speed  = speed;
    var jsonString= JSON.stringify(moveObj);
    tcpServer.sendMessage(jsonString)
});

app.get('/stop', (req, res) => {
    var stopObj = new Object();
    stopObj.action = "stop";
    var jsonString= JSON.stringify(stopObj);
    tcpServer.sendMessage(jsonString)
});


app.listen(HTTPServerPort, () => {
    console.log(`Dragonbackend listening at http://localhost:${HTTPServerPort}`)
});