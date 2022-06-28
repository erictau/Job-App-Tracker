var express = require('express');
var router = express.Router();
const jobAppsCtrl = require('../controllers/jobapps')
const isLoggedIn = require('../config/auth');


router.get('/', isLoggedIn, jobAppsCtrl.index);
router.get('/new', isLoggedIn, jobAppsCtrl.new);
router.post('/', isLoggedIn, jobAppsCtrl.create);
router.get('/:id', isLoggedIn, jobAppsCtrl.show);
router.delete('/:id', isLoggedIn, jobAppsCtrl.delete);
router.put('/:id', isLoggedIn, jobAppsCtrl.update);

module.exports = router;
