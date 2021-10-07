const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    leagues: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'League',
                required: true,
            },
        ],
        default: [],
    },
    teams: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team',
                required: true,
            },
        ],
        default: [],
    },
})

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    session: false,
})

userSchema.index({ email: 1 }, { unique: true })
module.exports = mongoose.model('User', userSchema)
