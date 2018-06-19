const mongoose = require('mongoose');

const ContractSchema = mongoose.Schema({
    proposal:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Proposal',
        required: true
    },
    client:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    lancer:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    startTime:{
        type: Date,
        required: true,
        default: Date.now()
    },
    endTime:{
        type: Date,
        required: true
    },
    paymentAmount:{
        type: Number,
        required: true,
        default: 100
    }
});

module.exports = mongoose.model('Contract', ContractSchema);