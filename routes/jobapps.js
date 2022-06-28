var express = require('express');
var router = express.Router();
const jobAppsCtrl = require('../controllers/jobapps')
const isLoggedIn = require('../config/auth');

/* GET users listing. */
router.get('/', isLoggedIn, jobAppsCtrl.index);
router.get('/new', isLoggedIn, jobAppsCtrl.new);
router.post('/', isLoggedIn, jobAppsCtrl.create);
router.get('/:id', isLoggedIn, jobAppsCtrl.show);

module.exports = router;
