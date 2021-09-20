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

leagueSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    await this.execPopulate('seasons')
    await Promise.all(
        this.seasons.map(async (season) => await season.deleteOne({ _id: season._id }))
    )
    next()
})

leagueSchema.index({ name: 1, organisation: 1 }, { unique: true })
module.exports = mongoose.model('League', leagueSchema)
