const mongoose = require('mongoose')

const roundSchema = new mongoose.Schema({
    date: {
        type: Date,
    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade',
        required: true,
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
