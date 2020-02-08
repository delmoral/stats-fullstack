const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    sportId: { type: String, required: true },
    sessionDate: [Date],
    startTime: { type: Date },
    endTime: { type: Date },
    excercises: [{ type: Schema.Types.ObjectId ,ref:'Excercise' }]
});

module.exports = mongoose.model('Session', sessionSchema);