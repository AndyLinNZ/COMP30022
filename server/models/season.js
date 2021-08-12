const mongoose = require('mongoose')

const seasonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dateStart: {
        type: Date,
        default: Date.now,
        required: true,
    },
    dateFinished: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['upcoming', 'progress', 'completed'],
        default: 'upcoming',
        required: true,
    },
    grades: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Grade',
        },
    ],
})

module.exports = mongoose.model('season', seasonSchema)
