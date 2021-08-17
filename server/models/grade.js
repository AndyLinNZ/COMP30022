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
    gradeGender: {
        type: String,
        enum: ['male', 'female', 'mixed'],
        default: 'mixed',
        required: true,
    },
    season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season',
        required: true,
    },
})

module.exports = mongoose.model('Grade', gradeSchema)
