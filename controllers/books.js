const gutendex = require("../api/gutendex")

exports.findById = async (req, res, next) => {
  const id = req.params.id
  try {
    const response = await gutendex.get("/books?ids=" + id)

    const searchResponse = await response.data
    if (searchResponse.count > 0) {
      res.render("search", {
        title: "Search results",
        searchResponse,
      })
    } else {
      res.render("search", {
        searchResponse,
        title: "Book not found",
      })
    }
  } catch (err) {
    console.log(err)
  }
}
