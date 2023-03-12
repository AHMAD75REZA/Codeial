const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codeil_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error conneting to MongoDB"));

db.once('open', function () {
    console.log('conneted to database:: MongoDB');
});

module.exports = db;