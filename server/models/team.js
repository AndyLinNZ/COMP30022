const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade',
    },
    totalPoints: {
        type: Number,
    },
    totalWins: {
        type: Number,
    },
    totalLosses: {
        type: Number,
    },
    totalDraws: {
        type: Number,
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
