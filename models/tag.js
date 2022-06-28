const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tagName: String,
    color: String,
    jobApps: {
        type: Schema.Types.ObjectId,
        ref: 'Job App'
    }
})