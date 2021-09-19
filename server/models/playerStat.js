const mongoose = require('mongoose')
const Player = require('./player')

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
        type: Number,
        max: 60,
        min: 0,
    },
})

playerStatSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    await this.execPopulate('playerId')
    await this.playerId.deleteOne({ _id: this.playerId._id })
    next()
})

module.exports = mongoose.model('PlayerStat', playerStatSchema)
