const mongoose = require('mongoose')

const roundSchema = new mongoose.Schema({
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
    teamsOnBye: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team',
            },
        ],
        default: [],
    }
})

roundSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    await this.execPopulate('games')
    await Promise.all(this.games.map(async (game) => await game.deleteOne({ _id: game._id })))
    next()
})

module.exports = mongoose.model('Round', roundSchema)
