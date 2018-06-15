//server/routes/routes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const User = require('../models/User');
const checkAuth = require('../../public/javascripts/controllers/authController');
const expressJWT = require('express-jwt');

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/register', function (req, res) {
    res.render('Register');
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
                        res.redirect('/user/');
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

router.post('/login', function (req, res, next) {
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
                    const token = jwt.sign({
                        email: user.email,
                        _id: user._id
                    },config.JWT_SECRET,
                    {
                        expiresIn: '1h'
                    });
                    console.log(token);
                    return res.redirect('/user/'+user._id);
                }
            })
        })
});

router.get('/logout', function (req, res) {
    req.logout();
    req.flash('successs', 'You are logged out');
    res.redirect('/');
})

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