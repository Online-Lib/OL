const express = require('express')
const userController = require('../controllers/user')
const { ensuredAuthentication } = require('../middlewares/isAuth')
const router = express.Router()
router.get('/search', userController.getSearch)

router.get('/secret', ensuredAuthentication, userController.getSearch)


module.exports = router