const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
},{
    timestamps: true
});

module.exports=mongoose.model('Message', MessageSchema);