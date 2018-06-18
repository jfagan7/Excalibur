const User = require('./User');
const mongoose = require('mongoose');

const LancerSchema= mongoose.Schema({
    skills: {
        type: [String],
        enum: ["Web Design", "Web Development", "Graphic Design", "Logo Design", "Branding", "SEO"],
        default: []
    },
    bio: {
        type: String,
        required: true,
        default: "Qui fuga voluptatum. Facere hic suscipit. Iusto odio suscipit et dolor cumque modi. Quam at maiores itaque enim debitis corrupti. Illo occaecati reiciendis ut. Numquam saepe quo sit ut sed blanditiis dolor consequatur.Et asperiores praesentium. Et animi eveniet quidem quo iure esse aut delectus ut. Dolores necessitatibus corrupti ut non sit. Soluta a minus mollitia omnis omnis totam. Quam ut doloribus eligendi minima alias. Aut dolor culpa.Nulla est eum non aut eveniet. Quia harum vitae. Est ut dolorem. Molestias nostrum ab eius vel voluptatem iure.Id est eum soluta nobis commodi iste. Dolorum distinctio nobis blanditiis aperiam. Mollitia aperiam quibusdam quia. Itaque labore eum totam iusto non reiciendis ut recusandae inventore. Tempora itaque aut. Voluptatibus sit debitis laboriosam numquam.Aspernatur placeat voluptas esse et excepturi nobis non. Accusantium harum odio corrupti vero. Est assumenda a ducimus voluptatem reiciendis cumque velit et. Quis facilis corporis. Voluptas sit reprehenderit maxime aspernatur odio est.Ipsum fugit voluptas ipsa ipsam fuga similique iusto enim blanditiis. Vel iure reiciendis ipsam odit quia accusantium. Vitae quia quo aut. Nesciunt culpa asperiores commodi nam nam qui voluptatem. Omnis ex doloribus aut inventore dolor molestias nisi."
    },
    rate: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        requried: true,
        default: "Undefined"
    },
    profession: {
        type: String,
        required: true,
        default: "Digital Designer"
    },
    completedJobs: [{type: mongoose.Schema.Types.ObjectId, ref:'Job'}]
});

const Lancer = User.discriminator('Lancer', LancerSchema);

module.exports = mongoose.model('Lancer');