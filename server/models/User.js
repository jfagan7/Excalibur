const mongoose = require('mongoose');
//let Job = Mongoose.Schema.Types.ObjectId

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
        enum: ["Web Design", "Web Development", "Graphic Design", "Logo Design", "Branding", "SEO"],
        default: []
    },
    bio:{
        type: String,
        required: true,
        default: ""
    },
    city:{
        type: String,
        required: true,
        default: ""
    },
    state: {
        type: String,
        required: true,
        default: ""
    },
    rate: {
        type:  Number,
        default: 0
    },
    gender: {
        type: String,
        requried: true,
        default:  "Undefined"
    },
    profession: {
        type: String,
        required: true,
        default: "Digital Designer"
    }
});


module.exports = mongoose.model('User',UserSchema);