const mongoose = require('mongoose')

const leagueSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    organisation: {
        type: String,
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
