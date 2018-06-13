const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var passport = require('passport');
const path = require('path');

const User =  require('../models/User');

getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

router.get('/', function (req, res) {
    res.render('dashboard');
});

router.get('/register', function(req, res){
    res.render('register');
});

router.post('/register', function(req, res){
    req.checkBody('firstName','The first name field must not be empty').notEmpty();
    req.checkBody('lastName','The last name field must not be empty').notEmpty();
    req.checkBody('email','You must enter a valid email').isEmail();
    req.checkBody('password','The password field must not be empty').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render('register',{
            errors: errors
        });
    } else {

        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
                user
                .save()
                .then(result=>{
                        console.log(result);
                        res.redirect('/user/');
                })
                .catch(err=>{
                    console.log(err);
                        res.status(500);
                        console.log(err);
                });
            }
});

router.get('/login', function(req, res){
    res.render('login');
})

router.post('/login',function(req, res){
    User.findOne({
        email: req.body.email
      }, function(err, user) {
        if (err) throw err;

        if (!user) {
          res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          // check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.sign(user, config.secret);
              // return the information including token as JSON
              res.json({success: true, token: 'JWT ' + token});
            } else {
              res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
          });
        }
      });
});

router.get('/dashboard', passport.authenticate('jwt',{session : false}),function (req, res) {
    let token = getToken(req.headers)
    if(token){
        res.render('dashboard');
    }
})

router.get('/logout', function(req, res){
    req.logout();
    req.flash('successs', 'You are logged out');
    res.redirect('/');
})

router.get('/users', function(req, res){
    User.find({},(err, users)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('users',{
                users: users
            });
        }
    })
})
module.exports = router;