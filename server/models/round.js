const mongoose = require('mongoose')

const roundSchema = new mongoose.Schema({
    // round: {
    //     type: Number,
    // },
    date: {
        type: Date,
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
    teamOnBye: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }
})

module.exports = mongoose.model('Round', roundSchema)
