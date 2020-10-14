const axios = require("axios")
const instance = axios.create({
  baseURL: "https://gutendex.com",
})

module.exports = instance
