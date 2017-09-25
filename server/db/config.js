const mongoose = require('mongoose');
require('./models/order');
require('./models/user');


const mongoDB = 'mongodb://dan:plantlife@ds149974.mlab.com:49974/acrud'

const db = mongoose.createConnection(mongoDB, { config: {autoIndex: false} }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to db')
    }
});

console.log(db)

module.exports = {
    db
}


