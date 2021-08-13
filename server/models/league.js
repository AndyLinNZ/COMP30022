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
    admins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    seasons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Season',
            required: false,
        },
    ],
})

module.exports = mongoose.model('League', leagueSchema)
