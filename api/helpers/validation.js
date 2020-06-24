module.exports = isValidISBN = function (isbn) {
  // length must be 10
  var n = isbn.length;
  console.log("nnnnnnnnnn", n);
  if (n != 10) return false;
};

module.exports = checkRequiredFields = function (book) {
  if (!book.book_name) {
    return {
      error: "Book name is required",
    };
  }
  if (!book.isbn) {
    return {
      error: "Book isbn is required",
    };
  }
  if (!book.author_name) {
    return {
      error: "Book author name is required",
    };
  }
  return false;
};
