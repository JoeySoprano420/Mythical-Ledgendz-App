const mongoose = require('mongoose');
const config = require('config');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('MongoDB connected');
    } catch (err) {
        logger.error(err.message);
        process.exit(1);
    }
};

module.exports = { connectDB };
