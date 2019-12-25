const express = require('express')

const app = express();
const port = 8080;

app.get('/', async (_, res) => res.send('omg'));

const btcusd = require('/data/btc/latest.json');
app.get('/btcusd', async (req, res) => res.send(btcusd));

const fiats = require('/data/fiats/latest.json');
app.get('/fiats', async (req, res) => res.send(fiats));

app.listen(port, () => console.log(`[INFO] Cryptojumps-backend listening on port ${port}!`))