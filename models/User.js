const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type:String, unique:true},
    otp: {type:String},
    createdAt:{ type: Date, default: Date.now }
});
module.exports = mongoose.model('user', UserSchema);