const fs = require('fs');
const axios = require('axios');

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

function updateRates() {
  // USD BTC
  const p1 = axios
    .get(`https://api.coindesk.com/v1/bpi/currentprice.json`)
    .then(({ data }) => saveAs('/data/btc/', `usdbtc_${+new Date()}`, JSON.stringify(data)))
    .catch((error) => console.error(error));

  // Fiat rates
  const p2 = axios
    .get(`https://openexchangerates.org/api/latest.json?app_id=${process.env.OPENEXCHANGERATES}`)
    .then(({ data }) => saveAs('/data/fiats/', `fiat_${+new Date()}`, JSON.stringify(data)))
    .catch((error) => console.error(error));

  return Promise.all([p1, p2]);
}

updateRates();
setInterval(updateRates, process.env.REFRESH_INTERVAL);