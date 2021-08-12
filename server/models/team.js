const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: String,
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade',
    },
    totalPoints: Number,
    totalWins: Number,
    totalLosses: Number,
    totalDraws: Number,
    gameResults = [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GameResult',
        },
    ]
})

module.exports = mongoose.model('Team', teamSchema)
