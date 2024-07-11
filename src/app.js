const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

require('dotenv').config();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Routes
const stockRoutes = require('./routes/stockRoutes');
app.use('/api/stocks', stockRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

module.exports = app;
