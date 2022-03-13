import axios from 'axios';
import { convertCurrencyProps, dailyRateProps } from '../types/api';
import Config from './config.json';

const { apiKey }= Config;
const baseURL = 'https://www.alphavantage.co/query?function=';

export const getExchangeRate = async ({ from, to }: convertCurrencyProps) => {
  const exchangeRateUrl = `${baseURL}CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${apiKey}`;
  const res = await axios.get(exchangeRateUrl);
  return res.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
}

export const getDailyRates = ({ from, to }: dailyRateProps) => {
  const dailyRateUrl = `${baseURL}FX_DAILY&from_symbol=${from}&to_symbol=${to}&apikey=${apiKey}`;
  return axios.get(dailyRateUrl);
}
