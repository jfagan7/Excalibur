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