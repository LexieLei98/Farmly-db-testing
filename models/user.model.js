const mongoose = require('mongoose');

//creating a new folder in the database
const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    postcode: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    profile_pic: {
        required: false,
        type: String
    },
    password: {
        required: true,
        type: Array
    }
})

module.exports = mongoose.model('Users', userSchema)