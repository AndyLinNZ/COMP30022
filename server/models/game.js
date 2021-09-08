const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    dateStart: {
        type: Date,
        default: Date.now,
        required: true,
    },
    dateFinished: {
        type: Date,
    },
    team1: {
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            required: true,
        },
        points: {
            type: Number,
        },
        playersStats: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'PlayerStat',
                required: true,
            }]
        },
    },
    team2: {
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            required: true,
        },
        points: {
            type: Number,
        },
        playersStats: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'PlayerStat',
                required: true,
            }]
        },
    },
    locationName: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
        },
    },
    status: {
        type: String,
        enum: ['upcoming', 'progress', 'completed'],
        default: 'upcoming',
        required: true,
    },
})

module.exports = mongoose.model('Game', gameSchema)
