const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { hashPassword, comparePassword } = require('../helpers/bcrypt')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        index: true,
        unique: true
    },
    username: String,
    password: String
})

//Unique email verify
userSchema.plugin(uniqueValidator);

/**
 * Hashing before save in database
 */
userSchema.pre('save', async function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    user.password = await hashPassword(user.password)
    // generate a salt
    next();
});

module.exports = mongoose.model('User', userSchema)