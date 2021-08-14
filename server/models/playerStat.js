const mongoose = require('mongoose')

const playerStatSchema = new mongoose.Schema({
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    },
    points: {
        type: Number,
    },
    assists: {
        type: Number,
    },
    rebounds: {
        offensive: {
            type: Number,
        },
        defensive: {
            type: Number,
        },
    },
    steals: {
        type: Number,
    },
    blocks: {
        type: Number,
    },
    fieldGoalMade: {
        type: Number,
    },
    fieldGoalAttempts: {
        type: Number,
    },
    turnOvers: {
        type: Number,
    },
    personalFouls: {
        type: Number,
    },
    plusMinus: {
        type: Number,
    },
    minutesPlayed: {
        type: Date,
    },
})

module.exports = mongoose.model('PlayerStat', playerStatSchema)
