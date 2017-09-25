const mongoose = require('mongoose');
db = require('../db/config.js');

const UserSchema = new mongoose.Schema({
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
})