const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sportSchema = new Schema({
    userId: { type: String, required: true },
    sessions: [{ type: Schema.Types.ObjectId , ref: "Session"}]
});

module.exports = mongoose.model('Sport', sportSchema);