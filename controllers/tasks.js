const JobApp = require('../models/jobapp');

module.exports = {
    create,
    delete: deleteTask,
    update
}


function create(req, res) {
    JobApp.findById(req.params.id)
    .then(jobApp => {
        jobApp.tasks.push(req.body);
        jobApp.tasks.sort((a, b) => b.dueDate - a.dueDate)
        console.log(jobApp.tasks)
        jobApp.save()
        .then(() => res.redirect(`/jobapps/${req.params.id}`))
    })
}

function deleteTask(req, res) {
    JobApp.findOne({'tasks._id': req.params.taskId})
    .then(jobApp => {
        jobApp.tasks.remove(req.params.taskId)
        jobApp.save()
        .then(() => res.redirect(`/jobapps/${jobApp._id}`))
    })
}

function update(req, res) {
    JobApp.findOne({'tasks._id': req.params.taskId})
    .then(jobApp => {
        const task = jobApp.tasks.id(req.params.taskId)
        for (let property in req.body) {
            task[property] = req.body[property];
        }
        jobApp.save()
        .then(() => res.redirect(`/jobapps/${jobApp._id}`));
    })
}