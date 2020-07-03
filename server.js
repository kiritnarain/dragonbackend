const express = require('express');
const app = express();
const port = 5091;
console.log('Dragonbackend initializing');

const DRAGON_PORT = 1080;
var dragonIP = "0.0.0.0";


app.get('//sync', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    dragonIP = ip+':'+DRAGON_PORT;
    console.log(`Synced with IP: ${dragonIP}`);
    res.send(`Dragon Backend Running! (captured ip: ${dragonIP})`)
});

app.get('//getIP', (req, res) => {
   res.send(dragonIP);
});


app.listen(port, () => {
    console.log(`Dragonbackend listening at http://localhost:${port}`)
});