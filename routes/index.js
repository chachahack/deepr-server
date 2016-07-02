var express = require('express');
var router = express.Router();

const dummy = require('./dummy.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/eat', (req, res, next) => {
  res.json(dummy);
})

module.exports = router;
