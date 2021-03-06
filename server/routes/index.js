//server/routes/routes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const exJWT = require('express-jwt');
const config = require('../../config/config');
const User = require('../models/User');
const checkAuth = require('../../public/javascripts/controllers/authController');

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403)
    }
}

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', function (req, res) {
    req.checkBody('name', 'The last name field must not be empty').notEmpty();
    req.checkBody('email', 'You must enter a valid email').isEmail();
    req.checkBody('password', 'The password field must not be empty').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.send(errors);
    } else {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
                console.log(err);
            } else {
                let user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    role: req.body.role
                });

                user
                    .save()
                    .then(result => {
                        console.log(result);
                        req.session.userId = result._id
                        console.log(req.session.userId);
                        res.redirect('/user/'+user._id);
                    })
                    .catch(err => {
                        console.log(err);
                        res.redirect('/register');
                    });
            }
        });
    }
});

router.get('/login', function (req, res) {
    res.render('Login');
})

router.post('/login', function(req, res){
    User.findOne({
            email: req.body.email
        })
        .exec()
        .then(user => {

            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err) {
                    return res.status(401).json({
                        message: err
                    });
                }
                if (result) {
                    console.log(result);
                        req.session.userId = user._id
                        console.log(req.session.userId);
                        res.redirect('/user/'+user._id);
                }
            })
        })
});



module.exports = router;