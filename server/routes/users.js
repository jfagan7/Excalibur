const express = require('express');
const expressJWT = require('express-jwt');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const checkAuth = require('../../public/javascripts/controllers/authController');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const User =  require('../models/User');
const Job = require('../models/Job');

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


router.get('/:id', function (req, res) {
    User.findById(req.params.id,function(err, user){
        if(err){
            console.log(err)
        } else{
            res.render('profile',{
                user: user
            });
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

router.get('/users', function (req, res) {
    User.find({}, function(err, users){
        if (err) {
            res.status(500).json({
                message: err
            })
        } else {
           res.status(200).json({
               message: users
           })
        }
    })
})

module.exports = router;