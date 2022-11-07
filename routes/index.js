var express = require('express');
var router = express.Router();
const Book = require('./models/book.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
});

module.exports = router;
