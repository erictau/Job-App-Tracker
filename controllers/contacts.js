const JobApp = require('../models/jobapp');

module.exports = {
    create,
}

function create(req, res) {
    console.log(req.body)
    JobApp.findByIdAndUpdate(req.params.id, {contact: req.body})
    .then(() => res.redirect(`/jobapps/${req.params.id}`));
}