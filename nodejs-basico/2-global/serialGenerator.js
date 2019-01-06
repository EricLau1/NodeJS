var config = require('./config');

module.exports.generate = function() {

    return Math.floor(Math.random() * config.max);

}

