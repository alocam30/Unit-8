var express = require('express');
var router = express.Router();
const Book = require('../models/book.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  (async () => {
    try {
      const allBooks = await Book.findAll();
      console.log( allBooks.map(res => res.json()) );
    } catch (error) {
    }}
  )}
  );

module.exports = router;
