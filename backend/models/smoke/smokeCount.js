const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const smokeCountSchema = new Schema({
    smokeId: { type: String, required: true },
    // Fecha formato Number ddMMyy?
    smokeDate: { type: Date, default: Date.now },
    cigs: { type: Number, default: 0}
});

/*
// La fecha es única, comprobar que existe, y entonces crear nuevo smokeCount
profileSchema.plugin(uniqueValidator, { message: 'El {PATH} to be unique.'});

profileSchema.query.bySmokeDate = (smokedate) =>{
    return this.find({smokeDate: smokedate})
};
*/

module.exports = mongoose.model('SmokeCount', smokeCountSchema);