const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const { connectDB } = require('./database/connection');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(bodyParser.json());

// Connect to database
connectDB();

// Routes
app.use('/api/calculator', require('./api/calculator'));
app.use('/api/dark-hunters-rpg', require('./api/dark-hunters-rpg'));
app.use('/api/arrow-unit', require('./api/arrow-unit'));
app.use('/api/on-q-entertainment', require('./api/on-q-entertainment'));

// Error handling middleware
app.use(errorHandler);

const PORT = config.get('PORT') || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

module.exports = app;
