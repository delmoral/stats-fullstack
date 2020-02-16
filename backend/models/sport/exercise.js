const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    sessionId: { type: String, required: true },
    exerciseName: { type: String, required: true},
    series: {type: Number, default: 0},
    reps: { type: Number, default: 0}
    //restTime: {},
});

module.exports = mongoose.model('Exercise', exerciseSchema);