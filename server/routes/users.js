const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var passport = require('passport');
const path = require('path');

const User =  require('../models/User');

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/register', function(req, res){
    res.render('Register');
});

router.post('/register', function(req, res){
    req.checkBody('firstName','The first name field must not be empty').notEmpty();
    req.checkBody('lastName','The last name field must not be empty').notEmpty();
    req.checkBody('email','You must enter a valid email').isEmail();
    req.checkBody('password','The password field must not be empty').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render('Register',{
            errors: errors
        });
    } else {
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: User.generateHash(req.body.password)
        });
            user
                .save()
                .then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message: 'User successfully created'
                        });
                        res.redirect()
                })
                .catch(err=>{
                    console.log(err);
                        res.status(500).json({
                            error: err
                        });
                })
    }
});

router.get('/login', function(req, res){
    res.render('Login');
})

router.post('/login',function(req, res, next){
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('successs', 'You are logged out');
    res.redirect('/');
})

router.get('/users', function(req, res){
    User.find({},(err, users)=>{
        if (err) {
            res.status(404).json({
                message: 'Could not find any users'
            });
        } else {
            res.status(201).json({
                users: users
            });
        }
    })
})
module.exports = router;