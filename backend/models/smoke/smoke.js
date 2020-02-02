const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const smokeSchema = new Schema({
    userId: { type: String, required: true },
    spent: { type: Number, default: 0}
});

module.exports = mongoose.model('Profile', smokeSchema);