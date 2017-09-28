const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

//User Schema
const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: {
        required: true,
        lowercase: true,
        type: String, 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid']
    },
    password: {
        required: true,
        type: String,
    },
    profilename: String,
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
})  



//Order Schema
const OrderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
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

const User = mongoose.model('User', UserSchema);
const Order = mongoose.model('Order', OrderSchema);

const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: 'Gabe',
    password: 'Plantlife'
});

user.save(function(err) {
    if (err) {
        return console.log(err, 'couldnt save')
    }
    var order1 = new Order({
        itemname: 'Jordans',
        user: user._id
    });

    console.log(order1)

    order1.save(function(err) {
        if (err) {
            return console.log(err, 'couldnt save user')
        }
    })
})

// console.log(Order);

Order.find({}, function(err, docs) {
    if (err) {
        console.log('couldnt find')
    } else {
        console.log(docs)
    }
})
// console.log(user)