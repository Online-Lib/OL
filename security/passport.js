const passport = require("passport")
const LocalStrategy = require("passport-local")
const { comparePassword } = require("../helpers/bcrypt")
const User = require("../models/User")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
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
      console.log(profile)
      User.findOrCreate(
        {
          name: profile.displayName,
          provider: profile.provider,
          googleId: profile.id,
        },
        function (err, user) {
          return cb(err, user)
        }
      )
    }
  )
)

/**
 * Facebook oauth2 strategy
 */

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile)
      User.findOrCreate(
        {
          name: profile.displayName,
          provider: profile.provider,
          facebookId: profile.id,
        },
        function (err, user) {
          return cb(err, user)
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
