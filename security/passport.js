const passport = require('passport')
const LocalStrategy = require('passport-local');
const { comparePassword } = require('../helpers/bcrypt');
const User = require('../models/User')

/**
 * Use local stategy with username and password
 */
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            //Compare hash password and password
            if (!comparePassword(password, user.password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

/**
 * Serialize user 
 */
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

/**
 * Deserialize user
 */
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});