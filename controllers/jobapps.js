const JobApp = require('../models/jobapp');

module.exports = {
    index,
    new: newApp
}


// Controller Functions

function index(req, res) {
    JobApp.find({ userId: req.user._id })
    .then(function(jobApps) {
        res.render('jobapps/index', {
            title: 'Job Applications',
            jobApps
        })
    })
}

function newApp(req, res) {
    res.render('jobapps/new', {
        title: 'New Job App'
    })
}