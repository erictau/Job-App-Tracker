const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    description: String,
    dueDate: Date,
    status: {
        type: String,
        enum:['To Do', 'In Progress', 'Complete']
    },
    priority: {
        type: String,
        enum:['Low', 'Med', 'High']
    },
}, {
    timestamps: true
})

const contactSchema = new Schema({
    name: String,
    title: String,
    phoneNumber: String,
    emailAddress: String,
})

const jobAppSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tasks: [taskSchema],
    jobTitle: String,
    location: String,
    company: String,
    status: {
        type: String,
        enum: ['Interested', 'Applied', 'Rejected', 'In Conversations', 'Interview Scheduled', 'Offered']
    },
    interestLevel: {
        type: String,
        enum: ['Low', 'Med', 'High']
    },
    contact: contactSchema,
    resumeVersion: String,
    coverLetterVersion: String,
    sentDate: Date,
    postingLink: String,
    notes: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('JobApp', jobAppSchema)