var express = require('express');
var router = express.Router();
const contactsCtrl = require('../controllers/contacts')
const isLoggedIn = require('../config/auth');

router.post('/jobapps/:id/contacts', contactsCtrl.create);

module.exports = router;