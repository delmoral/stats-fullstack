const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    sportId: { type: String, required: true },
    sessionDate: {type: Number, required: true },
    startTime: { type: Date , default: Date.now },
    endTime: { type: Date , default: null },
    exercises: [{ type: Schema.Types.ObjectId ,ref:'Exercise' }]
});

module.exports = mongoose.model('Session', sessionSchema);