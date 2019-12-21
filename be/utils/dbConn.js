require('dotenv').config({ path: './.env.production' });

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb://${user}:${password}@${process.env.MONGODB_URI}`;

const MongoClient = require('mongodb').MongoClient;

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true });

module.exports = client;