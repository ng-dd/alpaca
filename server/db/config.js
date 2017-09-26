const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// require('./models/order');
// require('./models/user');

const mongoDB = 'mongodb://dan:plantlife@ds149974.mlab.com:49974/acrud';
mongoose.Promise = global.Promise;

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


