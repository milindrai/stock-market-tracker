require('dotenv').config(); // Add this line at the top

const app = require('./app');
const connectDB = require('./config/db');
const stockController = require('./controllers/stockController');
const cron = require('node-cron');
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { // Change app.listen to server.listen
  console.log(`Server running on port ${PORT}`);
});

// Schedule the job to run every minute
cron.schedule('* * * * *', async () => {
  console.log('Fetching and storing stock data...');
  await stockController.fetchAndStoreStockData();
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Broadcast stock updates
  const sendStockUpdates = async () => {
    const stocks = await stockController.getLatestStockData();
    socket.emit('stockUpdate', stocks);
  };

  // Send updates every minute
  setInterval(sendStockUpdates, 60000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
