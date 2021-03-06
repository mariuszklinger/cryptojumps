import moment from 'moment';
import { getFiatRates, getBTCUSDRate } from "../api/http";
import countryInfoMap from './country-info';

export interface FiatRates {
  [key: string]: number;
}

export const NICE_NUMBERS = [
  10000,
  20000,
  50000,
  100000,
  200000,
  300000,
  500000,
  1000000
];

function formatDate(date: Date) {
  return moment(date).format('YYYY/MM/DD hh:mm:ss A');
}

export function getNearest(fiatrates: FiatRates, btcusd: number) {

  const out = NICE_NUMBERS.reduce((acc: any, value: number) => ({ ...acc, [value]: {}}), {
    others: {},
  });

  const epsilon = 0.1;

  const btcPrices = Object
    .entries(fiatrates)
    .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value * btcusd }), {} as FiatRates);

  Object
    .entries(btcPrices)
    .forEach(([currency, value]) => {
      NICE_NUMBERS.forEach((n, i, arr) => {
        const downBoundary = n * (1 - epsilon);

        if (value > downBoundary && value < n) {
          out[n][currency] = value.toFixed(2);
        }
      })
    });

  return out;
}

export async function init() {
  const [fiatrates, btcusdData] = await Promise.all([
    getFiatRates().then(({ data }) => Promise.resolve(data)),
    getBTCUSDRate().then(({ data }) => Promise.resolve(data))
  ]);

  const btcusd = btcusdData.bpi.USD.rate_float;

  return {
    ...getNearest(fiatrates.rates, btcusd),
    lastUpdateBTC: formatDate(new Date(btcusdData.time.updated)),
    lastUpdateFiats: formatDate(new Date(fiatrates.timestamp * 1000)),
    btcusd: btcusd,
  }
}

export function getCurrencyInfo(currency: string) {
  const notFound = {
    name: 'Unknown',
    population: '-',
    code: 'AR',
  };

  const {
    name,
    population,
    code
  } = countryInfoMap.find((obj) => obj.currency === currency) || notFound;

  return {
    code,
    country: name,
    population: (+population!).toLocaleString(),
  }
}
