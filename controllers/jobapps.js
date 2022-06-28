const JobApp = require('../models/jobapp');

module.exports = {
    index,
    new: newApp,
    create,
    show,
    delete: deleteApp,
    update
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
    console.log(req.body)
    JobApp.create(req.body);
    res.redirect('/jobapps');
}

function show(req, res) {
    JobApp.findById(req.params.id)
    .then(jobApp => {
        let currDate = new Date();
        let currDateString = currDate.getFullYear() + '-'
        + ('0' + (currDate.getMonth() + 1)).slice(-2) + '-'
        + ('0' + currDate.getDate()).slice(-2)
            
        res.render('jobapps/show', {
            title: 'Detail Page',
            jobApp,
            currDateString
        })
    })
}

function deleteApp(req, res) {
    JobApp.findByIdAndDelete(req.params.id)
    .then((err, doc) => {
        res.redirect('/jobapps')
    })
}

function update(req, res) {
    JobApp.findById(req.params.id)
    .then(jobApp => {
        console.log(req.body)
        for (let key in req.body) {
            jobApp[key] = req.body[key];
        }
        jobApp.save()
        .then(() => res.redirect(`/jobapps/${req.params.id}`))
    })
}