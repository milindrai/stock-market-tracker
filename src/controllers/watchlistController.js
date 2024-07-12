const Watchlist = require('../models/watchlistModel');

const addToWatchlist = async (req, res) => {
  const { stock } = req.body;
  const userId = req.userId;

  const watchlist = await Watchlist.findOne({ userId });
  if (watchlist) {
    watchlist.stocks.push(stock);
    await watchlist.save();
  } else {
    await Watchlist.create({ userId, stocks: [stock] });
  }

  res.status(200).json({ message: 'Stock added to watchlist' });
};

module.exports = { addToWatchlist };
