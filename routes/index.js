var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.redirect('/jobapps')
  } else {
  res.render('index', { title: 'Home'});
  }
});

// Login/Authentication
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google', 
  {
    successRedirect: '/', 
    failureRedirect: '/'
  }
));

router.get('/logout', function(req, res) {
  req.logout(function(err) {
    res.redirect('/');
  });
});

module.exports = router;
