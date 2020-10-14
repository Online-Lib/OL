if (process.env.NODE_ENV === "development") {
  require("dotenv").config()
}

const app = require("./app")
const { DB_URI } = require("./configs/env.config")
const { mongoose } = require("./helpers/db")
const PORT = process.env.PORT || 3000

mongoose.connect(
  DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  }
)
