const mongoose = require('mongoose');
const Job = require('../models/Job');
const Schema = mongoose.Schema;

const userOptions ={
    discriminatorKey: '_type',
    collection: 'users'
}

const UserSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        default: ""
    },
    state: {
        type: String,
        required: true,
        default: ""
    }
});


module.exports = mongoose.model('User', UserSchema);