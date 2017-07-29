var express = require('express');
var router = express.Router();





// // maintenance
// router.get('/', function(req, res, next) {
//   res.render('maintenance', { title: 'DeepDive - maintenance' });
// });
// maintenance
router.get('/*', function(req, res, next) {
  res.render('maintenance', { title: 'DeepDive - maintenance' });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DeepDive' });
});

/* GET search results page. */
router.get('/search*', function(req, res, next) {
  res.render('search', { title: 'DeepDive | search' });
});

router.get('/user/*', function(req, res, next) {
  res.render('profile', { title: 'DeepDive | user' });
});

router.get('/*/moments', function(req, res, next) {
  res.render('index', { title: 'Moments for artist' });
});

router.get('/bad-path', function(req, res, next) {
  res.render('bad-path', { title: 'DeepDive | artist' });
});

router.get('/*', function(req, res, next) {
  res.render('artist', { title: 'DeepDive | artist' });
});

module.exports = router;
