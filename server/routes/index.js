//server/routes/routes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('express-jwt');
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
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                });

                user
                    .save()
                    .then(result => {
                        console.log(result);
                        const token = jwt.sign({
                            id: result._id
                        }, config.JWT_SECRET);
                        req.user.token = token
                        console.log(req.token);
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
                        localStorage.setItem('userId', result._id)
                        console.log(result._id);
                    return res.redirect('/user/'+user._id);
                }
            })
        })
});


router.get('/users', function (req, res) {
    if(req.session.userId){
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
    } else {
        res.status(401);
    }

})
module.exports = router;