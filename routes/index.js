var express = require('express');
var router = express.Router();
const Book = require('../models').Book;
const books = require('../models/book');

/* GET home page. */

function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // res.status(500).send(error);
      next(error);
    }
  }
}

    router.get('/', asyncHandler(async (req, res) => {
      const allBooks = await Book.findAll();
      res.render("index", { books })
    }))



//shows full list of books

//shows the create new book form

//posts a new book to the database
router.post

//shows book detail form
router.get("/books/:id", );


//updates book info in the database
router.post("/books/:id")

//Deletes a book



module.exports = router;
