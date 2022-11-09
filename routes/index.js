var express = require('express');
var router = express.Router();
const Book = require('../models').Book;
const books = require('../models/book');


function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // res.status(500).send(error);
      next(error);
    }
  }
};


/* GET home page. */
router.get("/", (req, res, next) => {
  res.redirect("/books");
  next();
});

//shows full list of books
    router.get('/books', asyncHandler(async (req, res) => {
      const allBooks = await Book.findAll();
      res.render("index", { allBooks })
      // res.json({ allBooks });
    }))



// creates new book form
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render("new-book", {book: req.body})
}));

//posts a new book to the database
router.post('/books/new', asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.redirect("/books/new" + book.id);
}))


//displays book detail form
router.get("/books/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("update-book", { book })
}));


//updates book info in the database
router.post("/books/:id", asyncHandler( async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect("/books" + book.id);
}));

//Deletes a book



module.exports = router;
