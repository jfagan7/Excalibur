const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    skills:{
        type: [String],
        default: []
    }
});

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

UserSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User',UserSchema);