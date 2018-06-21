const express = require('express');
const expressJWT = require('express-jwt');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const exJWT = require('express-jwt');
const config = require('../../config/config');
const checkAuth = require('../../public/javascripts/controllers/authController');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const User =  require('../models/User');
const Job = require('../models/Job');

const messageRouter = require('./messages');

router.get('/:id', function (req, res) {
    User.findById(req.params.id,function(err, user){
        if(err){
            console.log(err)
        } else{
            res.render('profile',{
                user: user
            });
            req.session.userId = user._id;
            console.log(req.session.userId);
        }
    })

});

router.get('/register', (req,res)=>{
    res.render('register');
})

router.get('/logout', function(req, res){
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
          if(err) {
            return next(err);
          } else {
            return res.redirect('/');
          }
        });
      }
})

router.get('/', function(req,res){
    User.find({}, function(err, users){
        if(err){
            res.send(err);
        } else {
            res.send(users);
        }
    })
})


router.use('/messages', messageRouter);
module.exports = router;