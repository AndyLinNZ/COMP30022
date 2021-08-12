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
    winningTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team',
    },
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

module.exports = mongoose.model('game', gameSchema)
