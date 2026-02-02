const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true }
}, { timestamps: true });


const userModel = mongoose.model('users', UserSchema)

module.exports = userModel