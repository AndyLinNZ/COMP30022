const mongoose = require('mongoose')

const gameResultSchema = new mongoose.Schema({
    name: String,
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    points: Number,
    matchResult: {
        type: String,
        enum: ['win', 'loss', 'draw'],
        required: true,
    },
})

module.exports = mongoose.model('gameResult', gameResultSchema)
