const express = require('express');
const userRoutes = require('./routes/userRoutes');
const stockRoutes = require('./routes/stockRoutes');

require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


// Routes
const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/stocks', stockRoutes);

module.exports = app;