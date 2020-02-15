const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    //sportId: { type: String, required: true },
    exerciseName: { type: String},
    series: {type: Number, default: 0},
    reps: { type: Number, default: 0}
    //restTime: {},
});

module.exports = mongoose.model('Exercise', exerciseSchema);