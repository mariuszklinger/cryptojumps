const express = require('express')
const client = require('./utils/dbConn');

const app = express();
const port = 8080;

async function getLatest(tablename = 'btcusd') {
  return new Promise((resolve, reject) => {

    client.connect(async () => {
      console.log("Connected successfully to server");

      const db = client.db('heroku_fl7q25tf');
      const last = await db
        .collection(tablename)
        .find()
        .sort( { _id : -1 } )
        .limit(1);

      console.log(last);
      resolve(last);

      client.close();
    });
  });
}

const btcusd = require('/data/btc/latest.json');
app.get('/btcusd', async (req, res) => res.send(btcusd));

const fiats = require('/data/fiats/latest.json');
app.get('/fiats', async (req, res) => res.send(fiats));

app.listen(port, () => console.log(`[INFO] Cryptojumps-backend listening on port ${port}!`))