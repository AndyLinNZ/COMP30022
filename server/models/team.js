const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    grades: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Grade',
            },
        ],
        default: [],
    },
    players: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
            },
        ],
        default: [],
    },
    games: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Game',
            },
        ],
        default: [],
    },
})

module.exports = mongoose.model('Team', teamSchema)
