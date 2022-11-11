var express = require('express');
const book = require('../models/book');
var router = express.Router();
const Book = require('../models').Book;
const Sequelize = require('sequelize');



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
   res.redirect("/books" + book.id);
  } catch (error) {
    if(error.name === "SequelizeValidationError") { //checking the error
      book = await Book.build(req.body);
      res.render("new-book", {book, errors: error.errors, title: "New Book" });
    } else {
      throw error; //error caught in the asyncHandler's catch block
    }
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
router.post("/books/:id/delete", asyncHandler( async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect("/books")
  } else {
    res.sendStatus(404)
  }
}));


module.exports = router;
