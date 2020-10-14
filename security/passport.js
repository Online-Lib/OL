const passport = require("passport")
const LocalStrategy = require("passport-local")
const { comparePassword } = require("../helpers/bcrypt")
const User = require("../models/User")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = require("../configs/env.config")
/**
 * Use local stategy with username and password
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false)
        }
        //Compare hash password and password
        if (!comparePassword(password, user.password)) {
          return done(null, false)
        }
        return done(null, user)
      })
    }
  )
)

/**
 * Google oauth2 strategy
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      //For google +
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne(
        {
          googleId: profile.id,
        },
        function (err, user) {
          if (err) {
            return done(err)
          }
          //console.log(profile)
          //No user was found... so create a new user with values from Facebook (all the profile. stuff)
          if (!user) {
            user = new User({
              name: profile.displayName,
              //email: profile.emails[0].value,
              username: profile.username,
              provider: profile.provider,
              //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
              googleId: profile.id,
            })
            user.save(function (err) {
              if (err) console.log(err)
              return cb(err, user)
            })
          } else {
            //found user. Return
            return cb(err, user)
          }
        }
      )
    }
  )
)

/**
 * Serialize user
 */
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

/**
 * Deserialize user
 */
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})
