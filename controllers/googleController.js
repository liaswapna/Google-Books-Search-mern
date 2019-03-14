const axios = require("axios");
const db = require("../models");

// Defining methods for googleController

// findAll searches the Google Books API and returns only the entries we haven't already saved

// It also makes sure that the books returned from the API all contain a title, author, link, description, and image

module.exports = {
  findAll: (req, res) => {
    const { params } = req.body;
    axios
      .get("https://www.googleapis.com/books/v1/volumes", {
        params
      })
      .then(results =>
        results.data.items.filter(
          result =>
            result.volumeInfo.title &&
            result.volumeInfo.infoLink &&
            result.volumeInfo.authors &&
            result.volumeInfo.description &&
            result.volumeInfo.imageLinks &&
            result.volumeInfo.imageLinks.thumbnail
        )
      )
      .then(apiBooks => {
        // console.log(apiBooks.length);
        db.Book.find().then(dbBooks => {
          if (dbBooks.length !==0) {
            let s = dbBooks.map(dbBook =>
              apiBooks.filter(
                apiBook => dbBook.googleId.toString() !== apiBook.id
              )
            );
            return s;
            // dbBooks.filter(dbBook => dbBook.googleId.toString() !== apiBooks.id)
          }
          // console.log(apiBooks.length)
        });
        return apiBooks;
      })
      .then(books => {
        console.log(books.length)
        res.json(books);
      })
      .catch(err => res.status(422).json(err));
  }
};
