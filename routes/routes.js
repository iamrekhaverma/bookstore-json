var express = require('express');
const fs = require("fs");
var router = express.Router();


// Add a new book.
router.post('/add-book', function (req, res) {
    const book = req.body.book;
    fs.readFile('books.json', function(err, data) {
        if (err) throw err;
        var arrayOfObjects = JSON.parse(data);
        arrayOfObjects.books.push(book);
        fs.writeFile('books.json', JSON.stringify(arrayOfObjects), function(err) {
            if (err) res.send('Error!')
            res.send('Book added successfully!')
        });
    });
});

// Delete existing book.
router.delete('/delete-book/:id', function (req, res) {
    console.log("req",req.params)
    fs.readFile("books.json", (error, data) => {
        const booksJson = JSON.parse(data);
        if (error) throw error;
        
        const filterBooks = booksJson.books.filter(x=>x.book_id!=req.params.id);
        booksJson.books = filterBooks;
        console.log("data",booksJson);
        fs.writeFile('books.json', JSON.stringify(booksJson), function(err) {
            if (err) res.send('Error!')
            res.send('Book deleted successfully!')
        });
    });
});


// Update book details.
router.put('/books/:id', function (req, res) {
    const book = req.body.book;
    fs.readFile("books.json", (error, data) => {
        const booksJson = JSON.parse(data);
        console.log("data",booksJson);
        const index = booksJson.books.findIndex(x=>x.book_id===req.params.id);
        console.log("index",index)
        if(index !== -1) {
            console.log("44444444",req.body)
            booksJson.books[index] = book;
            fs.writeFile('books.json', JSON.stringify(booksJson), function(err) {
                if (err) res.send('Error!')
                res.send('Book updated successfully!')
            });
        } else {
            res.send("No book found with this id");
        }
    });
});


// Get book details by id
router.get('/books/:id', function (req, res) {
    fs.readFile("books.json", (error, data) => {
        data = JSON.parse(data);
        console.log("data",data.books);
        const filterBooks = data.books.filter(x=>x.book_id===req.params.id);
        data.books = filterBooks;
        res.send(data);
    });
});

// Get all the books details
router.get('/books', function (req, res) {
    fs.readFile("books.json", (error, data) => {
        data = JSON.parse(data);
        res.send(data);
    });
});

module.exports = router;