const gutendex = require("../api/gutendex");

exports.getSearch = async (req, res, next) => {
  console.log(req.query);
  try {
    const response = await gutendex.get("/books", {
      params: {
        search: req.query.query,
      },
    });

    const searchResults = response.data;
    res.render("search", { title: "Search results", searchResults });
  } catch (error) {
    console.log(error);
  }
};
