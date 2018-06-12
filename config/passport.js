const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../server/models/User');

module.exports = function(passport){
    passport.use(new LocalStrategy(
        function(email, password, done) {
          let query = { email: email };
          User.findOne( query, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect credentials' });
            }

            bcrypt.compare(password, user.password, function(err, isMatch){
              if(err) throw err;
              if(isMatch){
                return done(null, user);
              } else {
                return done(null, false, { message: 'Incorrect credentials' });
              }
            });
          });
        }));

    passport.serializeUser(function(user, done){
      done(null,user.id);
    });

    passport.deserializeUser(function(id, done){
      User.findById(id, function(err, user){
        done(err, user);
      })
    })
}