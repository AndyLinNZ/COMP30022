const mongoose = require('mongoose')

const leagueSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    organisation: {
        type: String,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    admins: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        ],
        default: [],
    },
    seasons: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Season',
                required: false,
            },
        ],
        defaukt: [],
    },
})

module.exports = mongoose.model('League', leagueSchema)
