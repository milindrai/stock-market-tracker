const app = require('./app');
const connectDB = require('./config/db');
const stockController = require('./controllers/stockController');
const cron = require('node-cron');


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// Schedule the job to run every minute
cron.schedule('* * * * *', async () => {
  console.log('Fetching and storing stock data...');
  await stockController.fetchAndStoreStockData();
});
