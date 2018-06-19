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

function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
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

router.get('/users', function(req, res) {
    User.find({})
    .exec()
    .then(users=>{
        console.log(users)
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
});
module.exports = router;