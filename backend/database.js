const mongoose = require('mongoose');

const URI = process.env.MONGO_URL;

mongoose.connect(URI)
    .then(db => console.log('DB connected'))
    .catch(err => console.error(err));
module.exports = mongoose;