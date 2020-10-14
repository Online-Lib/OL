module.exports = {
  /**
   * Ensured that the user is login (passportjs)
   * @param {*} req request
   * @param {*} res response
   * @param {*} next next function
   */
  ensuredAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect("/login")
    }
  },
  /**
   * Check if user is login then forward the user to another route without login
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  forwardAuthentication(req, res, next) {
    if (!req.isAuthenticated()) {
      next()
    } else {
      res.redirect("/")
    }
  },
}
