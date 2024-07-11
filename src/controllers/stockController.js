const axios = require('axios');
const Stock = require('../models/stockModel');

const fetchAndStoreStockData = async () => {
  try {
    // Fetch stock data using Gemini API
    const response = await axios.get('https://api.gemini.com/v1/pubticker/btcusd');
    const { last, change } = response.data;
    const stock = new Stock({ symbol: 'BTCUSD', price: last, change });
    await stock.save();
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
};

const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ createdAt: -1 });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  fetchAndStoreStockData,
  getStocks,
};
