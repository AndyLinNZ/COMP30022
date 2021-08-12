const mongoose = require('mongoose')

const fixtureSchema = new mongoose.Schema({
    round: {
        type: Number,
    },
    date: {
        type: Date,
    },
})

module.exports = mongoose.model('Fixture', fixtureSchema)
