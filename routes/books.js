const router = require("express").Router()
const controller = require("./../controllers/books")

router.get("/:id", controller.findById)

module.exports = router
