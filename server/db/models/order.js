const db = require('../db/config.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const OrderSchema = new mongoose.Schema({
    itemName: String, //=> jordan
    store: String, //=> nordstrom
    trackingNumber: String,
    serviceImg: String,
    service: String, //=> fedex
    currentLocation: String, //=> somewhere
    status: String, //=> departed
    deliveryDate: String //=> date, evening/afternoon/moring
},
{
    timestamps: true
});

mongoose.model('Order', OrderSchema);