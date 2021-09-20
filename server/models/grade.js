const mongoose = require('mongoose')

const gradeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    fixture: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Round',
            },
        ],
        default: [],
    }
})

gradeSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    await this.execPopulate('fixture')
    await Promise.all(this.fixture.map(async (round) => await round.deleteOne({ _id: round._id })))
    next()
})

gradeSchema.index({ season: 1, name: 1 }, { unique: true })
module.exports = mongoose.model('Grade', gradeSchema)
