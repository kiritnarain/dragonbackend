const express = require('express');
const app = express();
const port = 3001;
console.log('Dragonbackend initializing');

app.get('/', (req, res) => {
    res.send(`Dragon Backend Running! (captured ip: ${req.ip})`)
});

app.listen(port, () => {
    console.log(`Dragonbackend listening at http://localhost:${port}`)
});