const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const smokeProductSchema = new Schema({
    // Quitar smokeId y hacer artículos genéricos, añadir array de smokeProduct en smoke
    smokeId: { type: String, required: true },
    productName: { type: String, required: true },
    price: { type: Number, default: 0 }
});

module.exports = mongoose.model('SmokeProduct', smokeProductSchema);