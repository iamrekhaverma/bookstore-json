const fs = require("fs");

exports.getAllBooks = function () {
  return new Promise((resolve, reject) => {
    fs.readFile("books.json", (err, data) => {
      if (err) reject(err);

      data = JSON.parse(data);
      resolve(data);
    });
  });
};

exports.createBook = function (book) {
  return new Promise((resolve, reject) => {
    // const book = req.body.book;
    fs.readFile("books.json", function (err, data) {
      if (err) next(err);

      var arrayOfObjects = JSON.parse(data);
      const filterBooks = arrayOfObjects.books.filter(
        (x) => x.isbn === book.isbn
      );

      if (filterBooks && filterBooks.length > 0) {
        resolve("Book already exist!");
      }
      arrayOfObjects.books.push(book);
      fs.writeFile("books.json", JSON.stringify(arrayOfObjects), function (
        err
      ) {
        if (err) reject(err);
        resolve("Book added successfully!");
      });
    });
  });
};

exports.getBookDetails = function (bookId) {
  return new Promise((resolve, reject) => {
    fs.readFile("books.json", (error, data) => {
      if (error) reject(error);

      data = JSON.parse(data);
      const filterBooks = data.books.filter((x) => x.book_id === bookId);
      data.books = filterBooks;
      resolve(data);
    });
  });
};

exports.deleteBook = function (bookId) {
  return new Promise((resolve, reject) => {
    fs.readFile("books.json", (error, data) => {
      const booksJson = JSON.parse(data);
      if (error) reject(error);

      const filterBooks = booksJson.books.filter((x) => x.book_id != bookId);
      booksJson.books = filterBooks;
      fs.writeFile("books.json", JSON.stringify(booksJson), function (err) {
        if (error) resolve(error);

        resolve("Book deleted successfully!");
      });
    });
  });
};

exports.updateBook = function (bookId, book) {
  return new Promise((resolve, reject) => {
    fs.readFile("books.json", (error, data) => {
      if (error) next(error);

      const booksJson = JSON.parse(data);
      const index = booksJson.books.findIndex((x) => x.book_id === bookId);
      if (index !== -1) {
        booksJson.books[index] = book;
        fs.writeFile("books.json", JSON.stringify(booksJson), function (err) {
          if (err) reject(err);
          resolve("Book updated successfully!");
        });
      } else {
        resolve("No book found with this id");
      }
    });
  });
};
