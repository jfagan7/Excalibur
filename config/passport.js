// load up the user model
const User = require('../server/models/User');
const config = require('./config'); // get db config file

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
module.exports = function (passport) {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
            User.findOne({
                    email: email
                })
                .exec()
                .then(user => {
                    bcrypt.compare(password, user.password, function (err, match) {
                        if (err) {
                            console.log(err);
                        }
                        if (match) {
                            return done(null, user)
                        } else {
                            return done(null, false, {
                                message: 'Invalid Credentials'
                            });
                        }
                    })
                })
        }
    ));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}