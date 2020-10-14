const gutendex = require("../api/gutendex")

exports.getSearch = async (req, res, next) => {
  try {
    const response = await gutendex.get("/books", {
      params: {
        search: req.query.query,
      },
    })

    const searchResponse = response.data
    res.render("search", { title: "Search results", searchResponse })
  } catch (error) {
    console.log(error)
  }
}
