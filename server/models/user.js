const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
})

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    session: false,
})

module.exports = mongoose.model('User', userSchema)
