const express = require('express');
const app = express();
const port = 5091;
console.log('Dragonbackend initializing');

app.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.send(`Dragon Backend Running! (captured ip: ${ip})`)
});

app.listen(port, () => {
    console.log(`Dragonbackend listening at http://localhost:${port}`)
});