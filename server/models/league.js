const mongoose = require('mongoose')

const leagueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    organisation: {
        type: String,
        required: true,
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
        default: [],
    },
})

module.exports = mongoose.model('League', leagueSchema)
