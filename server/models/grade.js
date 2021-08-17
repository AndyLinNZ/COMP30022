const mongoose = require('mongoose')

const gradeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    difficulty: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E'],
        default: 'C',
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'mixed'],
        default: 'mixed',
        required: true,
    },
    teams: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team',
            },
        ],
        default: [],
    },
    season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season',
        required: true,
    },
})

module.exports = mongoose.model('Grade', gradeSchema)
