const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/test';

const db = mongoose.connection;
const Schema = mongoose.Schema;

const orderInfo = new Schema({
    trackingNumber: String,
    order: String,
    currentLocation: String
});

const Order = mongoose.model('Order', orderInfo);

module.exports = {
    Order
}


