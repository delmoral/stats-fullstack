const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const smokeCountSchema = new Schema({
    smokeId: { type: String, required: true },
    smokeDate: { type: Date, default: Date.now },
    cigarretes: { type: Number, default: 0}
});

// La fecha es única, comprobar que existe, y entonces crear nuevo smokeCount
profileSchema.plugin(uniqueValidator, { message: 'El {PATH} to be unique.'});

profileSchema.query.bySmokeDate = (smokeDate) =>{
    return this.find({userName: username})
};

module.exports = mongoose.model('Profile', smokeCountSchema);