const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var passport = require('passport');
const config = require('../../config/config');

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