const express = require("express")
const userController = require("../controllers/user")
const { ensuredAuthentication } = require("../middlewares/isAuth")
const router = express.Router()

router.get("/", userController.getLandingPage)

router.get("/search", userController.getSearch)

router.get("/secret", ensuredAuthentication, userController.getSearch)

router.get("/book/:id", userController.bookById)

router.get("/favorites", ensuredAuthentication, userController.getFavorite)

router.post("/favorites", ensuredAuthentication, userController.postFavorite)

router.post(
  "/removeFavorites",
  ensuredAuthentication,
  userController.removeFavorites
)

module.exports = router
