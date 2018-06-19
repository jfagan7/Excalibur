const mongoose = require('mongoose');

const ProposalSchema = mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Job',
        required: true
    },
    lancer:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    proposalTime:{
        type: Date,
        required: true,
        default: Date.now()
    },
    paymentAmount:{
        type: Number,
        required: true,
        default: 100
    },
    clientComment: {
        type: String
    }

})

module.exports = mongoose.model('Proposal', ProposalSchema);