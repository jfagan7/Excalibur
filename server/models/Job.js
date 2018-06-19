const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    client:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
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
    },
    isCompleted:{
        type: Boolean,
        required: true,
        default: false
    }


});

module.exports = mongoose.model('Job', JobSchema);