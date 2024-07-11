const db = require('../config/db');

const createStock = async (symbol, price, change) => {
  const result = await db.query(
    'INSERT INTO stocks (symbol, price, change) VALUES ($1, $2, $3) RETURNING *',
    [symbol, price, change]
  );
  return result.rows[0];
};

const getStocks = async () => {
  const result = await db.query('SELECT * FROM stocks');
  return result.rows;
};

module.exports = {
  createStock,
  getStocks,
};
