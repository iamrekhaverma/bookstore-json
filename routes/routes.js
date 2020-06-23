// import { v4 as uuidv4 } from 'uuid';
var express = require('express');
const fs = require("fs");
var router = express.Router();
var uuid = require('uuid');



// Add a new book.
router.post('/add-book', function (req, res,next) {
    const book = req.body.book;
    // console.log("book is",uuid())
    fs.readFile('books.json', function(err, data) {
        if (err) next(err);

        var arrayOfObjects = JSON.parse(data);
        // Check if book already exist
        const filterBooks = arrayOfObjects.books.filter(x=>x.isbn === book.isbn);
        
        if(filterBooks && filterBooks.length > 0) {
            res.status(400).send('Book already exist!')
        }
        arrayOfObjects.books.push(book);
        fs.writeFile('books.json', JSON.stringify(arrayOfObjects), function(err) {
            if (err) res.status(500).json({ error: err });
            res.status(200).send('Book added successfully!')
        });
    });
});

// Delete existing book.
router.delete('/delete-book/:id', function (req, res,next) {
    fs.readFile("books.json", (error, data) => {
        const booksJson = JSON.parse(data);
        if (error) next(error);
        
        const filterBooks = booksJson.books.filter(x=>x.book_id!=req.params.id);
        booksJson.books = filterBooks;
        fs.writeFile('books.json', JSON.stringify(booksJson), function(err) {
            if (error) next(error);

            res.status(200).send('Book deleted successfully!')
        });
    });
});


// Update book details.
router.put('/books/:id', function (req, res, next) {
    const book = req.body.book;
    fs.readFile("books.json", (error, data) => {
        if (error) next(error);
        
        const booksJson = JSON.parse(data);
        const index = booksJson.books.findIndex(x=>x.book_id===req.params.id);
        if(index !== -1) {
            booksJson.books[index] = book;
            fs.writeFile('books.json', JSON.stringify(booksJson), function(err) {
                if (err) res.status(500).json({ error: err })
                res.status(200).send('Book updated successfully!')
            });
        } else {
            res.send("No book found with this id");
        }
    });
});


// Get book details by id
router.get('/books/:id', function (req, res,next) {
    fs.readFile("books.json", (error, data) => {
        if(error) next(error);

        data = JSON.parse(data);
        const filterBooks = data.books.filter(x=>x.book_id===req.params.id);
        data.books = filterBooks;
        res.status(200).json(data);
    });
});

// Get all the books details
router.get('/books', function (req, res) {
    fs.readFile("books.json", (err, data) => {
        if (err) next(err);

        data = JSON.parse(data);
        res.status(200).send(data);
    });
});

module.exports = router;