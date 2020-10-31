const express = require("express")
const userController = require("../controllers/user")
const { ensuredAuthentication } = require("../middlewares/isAuth")
const router = express.Router()

router.get("/", userController.getLandingPage)

router.get("/search", userController.getSearch)

router.get("/secret", ensuredAuthentication, userController.getSearch)

router.get("/book/:id", userController.bookById)

module.exports = router
