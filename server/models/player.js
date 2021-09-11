const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        default: null
    },
})

playerSchema.index({ team: 1, name: 1 }, { unique: true })
module.exports = mongoose.model('Player', playerSchema)
