var service = require("../services/book.service");

// Display list of all books.
exports.book_list = async function (req, res) {
  try {
    let booksList = await service.getAllBooks();
    return res.status(200).json({
      data: booksList,
      status: true,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
      status: false,
    });
  }
};

// Display detail page for a specific book.
exports.book_detail = async function (req, res) {
  try {
    let bookDetail = await service.getBookDetails(req.params.id);
    return res.status(200).json({
      data: bookDetail,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

// Handle book create on POST.
exports.book_create_post = async function (req, res) {
  try {
    let bookRes = await service.createBook(req.body.book);
    return res.status(200).json({
      data: bookRes,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

// Handle book delete on POST.
exports.book_delete = async function (req, res) {
  try {
    let bookRes = await service.deleteBook(req.params.id);
    return res.status(200).json({
      data: bookRes,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

// Handle book update on POST.
exports.book_update_post = async function (req, res) {
  try {
    let bookRes = await service.updateBook(req.params.id, req.body.book);
    return res.status(200).json({
      data: bookRes,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};
