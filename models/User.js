const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const { hashPassword, comparePassword } = require("../helpers/bcrypt")
const findOrCreate = require("mongoose-findorcreate")

const userSchema = mongoose.Schema({
  email: {
    type: String,
  },
  username: String,
  password: String,
  googleId: String,
  facebookId: String,
  provider: String,
  name: String,
})

//Unique email verify
userSchema.plugin(uniqueValidator)

/**
 * Hashing before save in database
 */
userSchema.pre("save", async function (next) {
  var user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next()
  user.password = await hashPassword(user.password)
  // generate a salt
  next()
})

userSchema.plugin(findOrCreate)

module.exports = mongoose.model("User", userSchema)
