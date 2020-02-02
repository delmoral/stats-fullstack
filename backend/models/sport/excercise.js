const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const excerciseSchema = new Schema({
    sportId: { type: String, required: true },
    excerciseName: { type: String},
    series: {type: Number},
    reps: { type: Number}
    //restTime: {},
});

module.exports = mongoose.model('Profile', excerciseSchema);