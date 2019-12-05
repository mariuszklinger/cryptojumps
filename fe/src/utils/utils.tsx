import { getFiatRates, getBTCUSDRate } from "../api/http";
import currencyCountryMap from './currency-country';
import populationCountryMap from './population-country';

export interface FiatRates {
  [key: string]: number;
}

export const NICE_NUMBERS = [
  10000,
  100000,
  1000000
].reverse();

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
        // const upperBoundary = n * (1 + epsilon);
        const downBoundary = n * (1 - epsilon);

        if (value > downBoundary && value < n) {
          out[n][currency] = value.toFixed(2);
        }
      })
    }, out);

  return out;
}

export async function init() {
  const [fiatrates, btcusdData] = await Promise.all([
    getFiatRates().then(({ data }) => Promise.resolve(data.rates)),
    getBTCUSDRate().then(({ data }) => Promise.resolve(data))
  ]);

  return {
    ...getNearest(fiatrates, btcusdData.rate),
    lastUpdate: btcusdData.time,
    btcusd: btcusdData.rate.toLocaleString(),
  }
}

export function getCurrencyInfo(currency: string) {
  const { country } = currencyCountryMap.find((obj) => obj.currency_code === currency) || {
    country: 0,
  };

  const { population } = populationCountryMap.find((obj) => obj.country === country) || {
    population: 0,
  };

  return {
    country,
    population: (+population!).toLocaleString(),
  }
}
