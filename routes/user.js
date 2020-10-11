const express = require('express')
const userController = require('../controllers/user')
const router = express.Router()

router.get('/search', userController.getSearch)

module.exports = router