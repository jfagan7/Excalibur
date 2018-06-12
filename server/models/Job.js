const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    client:{
        type: String,
        required: true
    },
    datePosted:{
        type: Date,
        required: true,
        default: Date.now()
    },
    description:{
        type: String,
        required: true
    },
    skillNeeded:{
        type: [String],
        required: true,
        default: []
    }


});

module.exports = mongoose.model('Job', JobSchema);