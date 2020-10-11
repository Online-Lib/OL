const router = require('express').Router()
const passport = require('passport');
const User = require('../models/User');

router.get('/signup', (req, res, next) =>
    //res.json({ message: 'hi' })
    next()
);

router.post('/signup', async (req, res, next) => {
    const { email, password } = req.body
    try {
        const response = await User.create({
            email,
            password
        })
        res.redirect('/login')
    }
    catch (err) {
        console.log(err)
    }
}
);

/**
 * TODO: add views etc
 */
router.get('/login', (req, res, next) =>
    res.status(403).json({ message: 'Not allowed' })
);

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/secret')
    }
);

module.exports = router