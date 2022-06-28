const JobApp = require('../models/jobapp');

module.exports = {
    index,
    new: newApp,
    create,
    show
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

function create(req, res) {
    req.body.userId = req.user._id;
    JobApp.create(req.body);
    res.redirect('/jobapps');
}

function show(req, res) {
    JobApp.findById(req.params.id)
    .then(jobApp => res.render('jobapps/show', {
        title: 'Detail Page',
        jobApp
    }))
}