const JobApp = require('../models/jobapp');
const DateUtil = require('../utils/dateutils');

module.exports = {
    index,
    create,
    delete: deleteTask,
    update
}


function index(req, res) {
    // Create date 1 week from today's date to query for tasks that are due within 1 week.
    let date = new Date();
    let urgentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
    // Only grabs the job apps that have tasks with due dates within 1 week.
    JobApp.find({
        'tasks.dueDate': {$lt: urgentDate}, 
        userId: req.user._id
    })
    .then((jobApps) => {
        res.render('tasks/index', {
            title: 'Upcoming Tasks',
            jobApps,
            dates: {
                date,
                urgentDate
            },
            convertDateString: DateUtil.convertDateString
        })
    })
}

function create(req, res) {
    JobApp.findById(req.params.id)
    .then(jobApp => {
        jobApp.tasks.push(req.body);
        jobApp.tasks.sort((a, b) => a.dueDate - b.dueDate)
        jobApp.save()
        .then(() => res.redirect(`/jobapps/${req.params.id}`))
    })
}

function deleteTask(req, res) {
    JobApp.findOne({'tasks._id': req.params.taskId})
    .then(jobApp => {
        jobApp.tasks.remove(req.params.taskId)
        jobApp.save()
        .then(() => res.redirect('back'))
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
        .then(() => res.redirect('back'));
    })
}