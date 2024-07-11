const axios = require('axios');
const stockModel = require('../models/stockModel');

const fetchAndStoreStockData = async () => {
  // Fetch stock data using Gemini API
  const response = await axios.get('https://api.gemini.com/v1/pubticker/btcusd');
  const { last, change } = response.data;
  await stockModel.createStock('BTCUSD', last, change);
};

const getStocks = async (req, res) => {
  const stocks = await stockModel.getStocks();
  res.json(stocks);
};

module.exports = {
  fetchAndStoreStockData,
  getStocks,
};
