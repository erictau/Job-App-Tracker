var express = require('express');
var router = express.Router();
const contactsCtrl = require('../controllers/contacts')
const isLoggedIn = require('../config/auth');



module.exports = router;