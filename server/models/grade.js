const mongoose = require('mongoose')

const gradeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    gradeGender: {
        type: String,
        enum: ['male', 'female', 'mixed'],
        default: 'mixed',
        required: true,
    },
})

module.exports = mongoose.model('Grade', gradeSchema)
