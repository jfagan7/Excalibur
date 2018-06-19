//server/routes/routes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const User = require('../models/User');
const checkAuth = require('../../public/javascripts/controllers/authController');

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', function (req, res) {
    req.checkBody('firstName', 'The first name field must not be empty').notEmpty();
    req.checkBody('lastName', 'The last name field must not be empty').notEmpty();
    req.checkBody('email', 'You must enter a valid email').isEmail();
    req.checkBody('password', 'The password field must not be empty').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render('Register', {
            errors: errors
        });
    } else {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
                console.log(err);
            } else {
                let user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash
                });

                user
                    .save()
                    .then(result => {
                        console.log(result);
                        req.session.id = user._id;
                        console.log(req.session.id);
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
                    req.session.userId = user._id;
                    console.log(req.session.userId);
                    return res.redirect('/user/'+user._id);
                }
            })
        })
});


router.get('/users', function (req, res) {
    User.find({}, (err, users) => {
        if (err) {
            res.status(404).json({
                message: 'Could not find any users'
            });
        } else {
            res.status(200).json({
                users: users
            });
        }
    })
})
module.exports = router;