const User = require("./../models/User")
const Book = require("./../models/Book")
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
        user: req.user,
      },
    })

    const searchResponse = response.data

    let bookIdInFavourite = [];

    try {
      const books = await Book.find({ userId: req.user._id })
      books.forEach(book => {
        bookIdInFavourite.push(book.bookId)
        console.log(bookIdInFavourite)
      })
    } catch (err) {
      bookIdInFavourite = []
    }

    res.render("search", {
      title: "Search results",
      searchResponse,
      page,
      search,
      bookIdInFavourite,
      user: req.user,
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

// favorite
exports.getFavorite = async (req, res, next) => {
  const bookIds = []
  try {
    const response = await Book.find({ userId: req.user._id })
    response.forEach((book) => {
      bookIds.push(book.bookId)
    })
  } catch (err) {
    console.log(err)
  }
  if (bookIds.length < 1) {
    res.render("favorite", {
      title: "Favorites",
      user: req.user,
      fav: false,
    })
  } else {
    const bookId = bookIds.join(",")
    try {
      const response = await gutendex.get(`/books?ids=${bookId}`)
      res.render("favorite", {
        title: "Favorites",
        books: response.data,
        user: req.user,
        fav: true,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

exports.postFavorite = (req, res, next) => {
  const { userId, bookId } = req.body
  const book = new Book({
    userId,
    bookId,
  })

  book
    .save()
    .then(() => {
      res.redirect("/favorites")
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.removeFavorites = (req, res, next) => {
  const { userId, bookId } = req.body
  // Book.find({ userId })
  //   .then((books) => {
  //     Book.find({ bookId: books.bookId })
  //       .then((book) => {
  //         console.log(book)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })

  Book.find({ userId, bookId })
    .then((result) => {
      Book.findByIdAndDelete(result[0]._id)
        .then((data) => {
          console.log(data)
          res.redirect("/favorites")
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}
