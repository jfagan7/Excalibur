// load up the user model
const User = require('../server/models/User');
const config = require('./config'); // get db config file

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
module.exports=function(passport){
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        User.findOne({email: email})
        .exec()
        .then(user => {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    console.log('User successfully logged in');
                }
            })
        })
    }
));

}
