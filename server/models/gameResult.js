const mongoose = require('mongoose')

const gameResultSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    points: {
        type: Number,
    },
    matchResult: {
        type: String,
        enum: ['win', 'loss', 'draw'],
        required: true,
    },
})

module.exports = mongoose.model('GameResult', gameResultSchema)
