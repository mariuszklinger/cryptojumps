require('dotenv').config({ path: './.env.production' });

const fs = require('fs');
const axios = require('axios');
// const client = require('../utils/dbConn');

function saveAs(path, filename, data) {
  const timestampedFilename = `${path}/${filename}.json`;
  const latestFilename = `${path}/latest.json`;

  fs.writeFile(timestampedFilename, data, (err) => {
    if(err) {
      return console.log(err);
    }

    console.log(`[INFO] file ${timestampedFilename} saved`);
  });

  fs.writeFile(latestFilename, data, (err) => {
    if(err) {
      return console.log(err);
    }

    console.log(`[INFO] file ${latestFilename} (latest) saved`);
  });
}

async function saveDb(obj, tablename) {
  const objectWithTimestamp = {
    ...obj,
    timestamp: +Date(),
  };

  // Use connect method to connect to the Server
  client.connect(function(err) {
    console.log("Connected successfully to server");

    const db = client.db('heroku_fl7q25tf');
    db
      .collection(tablename)
      .insertOne(objectWithTimestamp);

    client.close();
  });
}

function updateRates() {
  // USD BTC
  const p1 = axios
    .get(`https://rest.coinapi.io/v1/exchangerate/BTC/USD?apikey=${process.env.COINAPI}`)
    .then(({ data }) => saveAs('/data/btc/', `usdbtc_${+new Date()}`, JSON.stringify(data)))
    .catch((error) => console.log(error));

  // Fiat rates
  const p2 = axios
    .get(`https://openexchangerates.org/api/latest.json?app_id=${process.env.OPENEXCHANGERATES}`)
    .then(({ data }) => saveAs('/data/fiats/', `fiat_${+new Date()}`, JSON.stringify(data)))
    .catch((error) => console.log(error));

  return Promise.all([p1, p2]);
}

updateRates();