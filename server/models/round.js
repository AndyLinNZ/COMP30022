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
    },
})

roundSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    await this.execPopulate('games')
    await Promise.all(this.games.map(async (game) => await game.deleteOne({ _id: game._id })))
    next()
})

module.exports = mongoose.model('Round', roundSchema)
