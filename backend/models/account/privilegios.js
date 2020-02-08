const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privilegiosSchema = new Schema({
    privilegios: [{ type: Schema.Types.ObjectId, ref: 'Privilegio' }]
});

const privilegioSchema = new Schema({
    userId: String,
    level: Number
})

module.exports = mongoose.model('Privilegios', privilegiosSchema);
module.exports = mongoose.model('Privilegio', privilegioSchema);