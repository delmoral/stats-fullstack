const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const session = require('./session');

const sportSchema = new Schema({
    userId: { type: String, required: true },
    sessions: { type: [session] , ref: "Product"}
});

module.exports = mongoose.model('Profile', sportSchema);