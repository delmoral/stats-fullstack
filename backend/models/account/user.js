const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    userName: { type: String, unique: true, index: true, uniqueCaseInsensitive: true , required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: Number,
    avatar: { type: String, default: null},
    creationDate: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now}//,
    //smokeOn: { type: Boolean, default: false},
    //sportOn: { type: Boolean, default: false},
    //moneyOn: { type: Boolean, default: false},
    //youtubeOn: { type: Boolean, default: false}

});

profileSchema.plugin(uniqueValidator, { message: 'El {PATH} to be unique.'});

profileSchema.query.byUsername = (username) =>{
    return this.find({userName: username})
};

module.exports = mongoose.model('User', userSchema);