const fs = require('fs');
const axios = require('axios');

function saveAs(filename, data) {
  fs.writeFile(filename, data, function(err) {
    if(err) {
      return console.log(err);
    }

    console.log(`[INFO] file ${filename} saved`);
  });
}

function updateRates() {
  // USD BTC
  const p1 = axios
    .get(`https://rest.coinapi.io/v1/exchangerate/BTC/USD?apikey=${process.env.COIN_API_KEY}`)
    .then(({ data }) => saveAs('./build/btc-usd.json', JSON.stringify(data)))
    .catch((error) => console.log(error));

  // Fiat rates
  const p2 = axios
    .get(`https://openexchangerates.org/api/latest.json?app_id=${process.env.OPENEXCHANGERATES}`)
    .then(({ data }) => saveAs('./build/fiat-rates.json', JSON.stringify(data)))
    .catch((error) => console.log(error));

  return Promise.all([p1, p2]);
}

updateRates();