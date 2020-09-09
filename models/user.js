const mongoose = require('mongoose');

//Create Scheme or Database
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    /* For expiring JWTs */
    sessions: {
        type: Array,
        required: true,
        default: []
    },

    /* Password resets */
    resetPasswordToken: {
        type: String,
        default: null
    },

    resetPasswordTokenExpires: {
        type: Date,
        required: true,
        default: Date.now
    },
    name: {
        type: String,
        default: null
    },
    avatar: {
        type: Buffer,
        default: null
    }
});

module.exports = mongoose.model('User', userSchema);