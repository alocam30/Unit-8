var express = require('express');
const book = require('../models/book');
var router = express.Router();
const Book = require('../models').Book;
const Sequelize = require('sequelize');
const createError = require('http-errors');


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


// /* GET home page. */
router.get("/", (req, res, next) => {
  res.redirect("/books");
});

// //shows full list of books
    router.get('/books', asyncHandler(async (req, res) => {
      const allBooks = await Book.findAll();
      res.render("index", { allBooks })
      // res.json({ allBooks });
    }))



// creates new book form
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render("new-book", { title: 'New Book '})
}));

//posts a new book to the database
router.post('/books/new', asyncHandler(async (req, res) => {
  let book;
  try {
   book = await Book.create(req.body);
   res.redirect("/books/" + book.id);
  } catch (error) {
      res.render("new-book", {book, errors: error.errors, title: "New Book" });
    } 
  }));


//displays book detail form
router.get("/books/:id", asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
  res.render("update-book", { book });
  } else {
    next(createError(404))
  }
}));


//update book info in the database
router.post("/books/:id", asyncHandler( async (req, res) => {
  let book;
  try {
   book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.redirect("/books/" + book.id);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id; 
      res.render("update-book", {book, errors: error.errors, title: "Update Book"})
    } else {
      throw error;
    }
  } }
));

// Deletes a book
router.post("/books/:id/delete", asyncHandler( async (req, res, next) => {
 let bookId = req.params.id
 try {
  let book = await Book.findOne({ where: { id: bookId}})
  if (book) {
    await book.destroy();
    res.redirect("/books")
  } else {
    next(createError(404, "Could not find any books with this id"))
  }
 }
 catch (error) {
  next(error)
 }
}));


module.exports = router;
