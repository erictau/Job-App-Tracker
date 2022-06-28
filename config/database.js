const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jobapps');

const db = mongoose.connection;

db.on('connected', () => console.log(`Connected to MongoDB at ${db.host}: ${db.port}`));