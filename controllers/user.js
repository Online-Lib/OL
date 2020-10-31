const gutendex = require("../api/gutendex")

exports.getLandingPage = (req, res, next) => {
  res.render("landing", { title: "gutendex" })
}

exports.getSearch = async (req, res, next) => {
  try {
    const page = req.query.page || 1
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
    res.send(error)
    console.log(error)
  }
}

exports.bookById = async (req, res, next) => {
  const id = req.params.id
  try {
    const response = await gutendex.get(`/books/${id}`)
    let url = ""
    for (let key in response.data.formats) {
      if (key.includes("text/html")) {
        url = response.data.formats[key]
        break
      }
    }
    if (url.includes(".zip") || url === "") {
      for (let key in response.data.formats) {
        if (key.includes("text/plain")) {
          url = response.data.formats[key]
          if (!url.includes(".zip")) {
            break
          }
        }
      }
    }
    res.render("book", {
      title: response.data.title,
      url,
    })
  } catch (err) {
    res.send("book not found")
    console.log(err)
  }
}
