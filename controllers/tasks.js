const JobApp = require('../models/jobapp');

module.exports = {
    create,
    delete: deleteTask
}


function create(req, res) {
    JobApp.findById(req.params.id)
    .then(jobApp => {
        console.log(req.body);
        jobApp.tasks.push(req.body);
        jobApp.tasks.sort((a, b) => b.dueDate - a.dueDate)
        jobApp.save()
        .then(() => res.redirect(`/jobapps/${req.params.id}`))
    })
}

function deleteTask(req, res) {
    JobApp.findById(req.params.jobId)
    .then(jobApp => {
        let index = jobApp.tasks.findIndex(task => task._id.equals(req.params.taskId))
        jobApp.tasks.splice(index, 1);
        jobApp.save()
        .then(() => res.redirect(`/jobapps/${req.params.jobId}`))
    })
}