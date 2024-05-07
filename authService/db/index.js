const mongoose = require('mongoose');

mongoose.connect('mongodb://auth-db:27017/ecommerce_auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const db = mongoose.connection;

module.exports = db;