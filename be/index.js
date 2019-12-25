const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

app.get('/', async (_, res) => res.send('omg...'));

app.get('/btcusd', async (req, res) => {
  fs.readFile('/data/btc/latest.json', 'utf8', function (err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
    res.end(data);
  });
});

app.get('/fiats', async (req, res) => {
  fs.readFile('/data/fiats/latest.json', 'utf8', function (err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
    res.end(data);
  });
});

app.listen(port, () => console.log(`[INFO] Cryptojumps-backend listening on port ${port}!`));