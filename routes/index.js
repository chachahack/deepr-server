const express = require('express');
const router = express.Router();

// const dummy = require('./dummy.json');
const gnavi = require('./gnavi');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/eat', (req, res, next) => {
  gnavi.search(req.query['freeword'], req.query['lat'], req.query['lng'], 1)
    .then(data => res.json(data))
    .catch(data => res.json(data))
});

router.get('/eat_g', (req, res, next) => {
  gnavi.g_search(req.query['id'])
    .then(data => res.json(data))
    .catch(data => res.json(data))
});

module.exports = router;
