const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
  bookId: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})

module.exports = mongoose.model("Book", BookSchema)
