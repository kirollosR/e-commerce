const { MongoClient } = require('mongodb');

const uri = 'mongodb://usersDb:27018/ecommerce_users';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        // Additional code for handling the connection
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = {
    connectToMongo
};