const mongoose = require('mongoose');
// const User = mongoose.model('User');

const OrderSchema = new mongoose.Schema({
    itemname: String, //=> jordan
    store: String, //=> nordstrom
    trackingnumber: String,
    serviceimg: String,
    service: String, //=> fedex
    currentlocation: String, //=> somewhere
    status: String, //=> departed
    deliverydate: String //=> date, evening/afternoon/moring
},
{
    timestamps: true
});

// const Order = mongoose.model('Order', OrderSchema);

// const order = new Order({
//     itemName: 'jordans'
// })

// // console.log(order);

// order.save(function(err) {
//     if (err) {
//         return console.log(err);
//     }
// })

module.exports = {OrderSchema};