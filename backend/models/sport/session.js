const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const excercise = require('./excercise');

const sessionSchema = new Schema({
    sportId: { type: String, required: true },
    sessionDate: {type: [Date]},
    startTime: {type: Date, default: Date.now},
    endTime: {type: Date },
    excercises: { type: [excercise] } 
});

module.exports = mongoose.model('Profile', sessionSchema);