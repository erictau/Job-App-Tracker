var express = require('express');
var router = express.Router();
const tasksCtrl = require('../controllers/tasks')
const isLoggedIn = require('../config/auth');

router.get('/tasks', isLoggedIn, tasksCtrl.index);
router.post('/jobapps/:id/tasks', isLoggedIn, tasksCtrl.create);
router.delete('/tasks/:taskId', isLoggedIn, tasksCtrl.delete);
router.put('/tasks/:taskId', isLoggedIn, tasksCtrl.update);


module.exports = router;