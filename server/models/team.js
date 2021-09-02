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
    totalPoints: {
        type: Number,
        default: 0,
    },
    totalWins: {
        type: Number,
        default: 0,
    },
    totalLosses: {
        type: Number,
        default: 0,
    },
    totalDraws: {
        type: Number,
        default: 0,
    },
    gameResults: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'GameResult',
            },
        ],
        default: [],
    },
})

module.exports = mongoose.model('Team', teamSchema)
