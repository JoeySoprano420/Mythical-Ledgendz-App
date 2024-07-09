const logger = require('../utils/logger');

module.exports = function(err, req, res, next) {
    logger.error(err.message);
    res.status(500).send('Server Error');
};
