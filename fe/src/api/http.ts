import axios from "axios";

export function getFiatRates() {
  return axios.get('./fiat-rates.json');
};

export function getBTCUSDRate() {
  return axios.get('./btc-usd.json');
};