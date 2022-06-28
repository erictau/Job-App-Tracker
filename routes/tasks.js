var express = require('express');
var router = express.Router();
const tasksCtrl = require('../controllers/tasks')
const isLoggedIn = require('../config/auth');


router.post('/jobapps/:id/tasks', isLoggedIn, tasksCtrl.create);
router.delete('/jobapps/:jobId/tasks/:taskId', isLoggedIn, tasksCtrl.delete);


module.exports = router;