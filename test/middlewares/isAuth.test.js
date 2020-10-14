const {
  ensuredAuthentication,
  forwardAuthentication,
} = require("../../middlewares/isAuth")
const should = require("chai").should() //actually call the function

describe("IsAuth", function () {
  describe("check authentication", function () {
    it("ensure authentication should pass if isAuthenticated is true", async function () {
      req = {
        isAuthenticated() {
          return true
        },
      }
      let result = false
      ensuredAuthentication(req, {}, () => {
        result = true
      })
      result.should.equal(true)
    })

    it("ensure authentication should not pass if isAuthenticated is false", async function () {
      req = {
        isAuthenticated() {
          return false
        },
      }
      let result = false
      res = {
        redirect() {
          result = true
        },
      }
      ensuredAuthentication(req, res, () => {
        const dummy = false
        dummy.should.equal(true)
      })
      result.should.equal(true)
    })

    it("forward authetication should pass login if isAuthenticated is true", async function () {
      req = {
        isAuthenticated() {
          return true
        },
      }
      let result = false
      res = {
        redirect() {
          result = true
        },
      }
      forwardAuthentication(req, res, () => {
        const dummy = false
        dummy.should.equal(true)
      })

      result.should.equal(true)
    })
  })
})
