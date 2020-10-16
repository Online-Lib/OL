const gutendex = require("../api/gutendex")

exports.getSearch = async (req, res, next) => {
  try {
    const { page } = req.query || 1
    const search = req.query.query
    const response = await gutendex.get("/books", {
      params: {
        search: req.query.query,
        page,
      },
    })

    const searchResponse = response.data
    res.render("search", {
      title: "Search results",
      searchResponse,
      page,
      search,
    })
  } catch (error) {
    console.log(error)
  }
}
