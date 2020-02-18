const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const smokeProdTemplateSchema = new Schema({
    prodName: { type: String},
    prodPrice: { type: Number}
});

module.exports = mongoose.model('SmokeProdTemplate', smokeProdTemplateSchema);