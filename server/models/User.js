const mongoose = require('mongoose');
const Job = require('../models/Job');
const Schema = mongoose.Schema;



const UserSchema = Schema({
    name:{
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
    skills: {
        type: [String],
        default: []
    },
    bio: {
        type: String,
        default: "Qui fuga voluptatum. Facere hic suscipit. Iusto odio suscipit et dolor cumque modi. Quam at maiores itaque enim debitis corrupti. Illo occaecati reiciendis ut. Numquam saepe quo sit ut sed blanditiis dolor consequatur.Et asperiores praesentium. Et animi eveniet quidem quo iure esse aut delectus ut. Dolores necessitatibus corrupti ut non sit. Soluta a minus mollitia omnis omnis totam. Quam ut doloribus eligendi minima alias. Aut dolor culpa.Nulla est eum non aut eveniet. Quia harum vitae. Est ut dolorem. Molestias nostrum ab eius vel voluptatem iure.Id est eum soluta nobis commodi iste. Dolorum distinctio nobis blanditiis aperiam. Mollitia aperiam quibusdam quia. Itaque labore eum totam iusto non reiciendis ut recusandae inventore. Tempora itaque aut. Voluptatibus sit debitis laboriosam numquam.Aspernatur placeat voluptas esse et excepturi nobis non. Accusantium harum odio corrupti vero. Est assumenda a ducimus voluptatem reiciendis cumque velit et. Quis facilis corporis. Voluptas sit reprehenderit maxime aspernatur odio est.Ipsum fugit voluptas ipsa ipsam fuga similique iusto enim blanditiis. Vel iure reiciendis ipsam odit quia accusantium. Vitae quia quo aut. Nesciunt culpa asperiores commodi nam nam qui voluptatem. Omnis ex doloribus aut inventore dolor molestias nisi."
    },
    rate: {
        type: Number,
        default: 0
    },
    profession: {
        type: String,
        default: "Digital Designer"
    },
    role: {
        type: String,
        enum: ["Client", "Lancer"],
        required: true,
        default: "Client"
    }
});


module.exports = mongoose.model('User', UserSchema);