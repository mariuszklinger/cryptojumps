import axios from "axios";

const host = window.location.origin;

export function getFiatRates() {
  return axios.get(`${host}:8080/fiats`);
};

export function getBTCUSDRate() {
  return axios.get(`${host}:8080/btcusd`);
};