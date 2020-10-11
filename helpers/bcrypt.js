const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Hash password
 * @param {String} password password to hash
 */
module.exports.hashPassword = async (password) => {
    try {
        const hash = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        })
        return hash;
    }
    catch (err) {
        console.log(err)
    }
}

/**
 * Compare password
 * @param {String} password password to compare
 * @param {String} hash hash password
 */
module.exports.comparePassword = async (password, hash) => {
    const result = await new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
            if (err) console.log(err)
            resolve(result)
        });
    })
    return result

}