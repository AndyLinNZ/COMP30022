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
    dateFinish: {
        type: Date,
        required: true,
    },
    league: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League',
        required: true,
    },
    grades: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Grade',
            },
        ],
        default: [],
    },
})

seasonSchema.virtual('status').get(function () {
    if (this.dateFinish <= Date.now()) return 'completed'
    if (this.dateFinish > Date.now() && Date.now() > this.dateStart) return 'active'
    return 'upcoming'
})

seasonSchema.pre('validate', function (next) {
    if (this.dateStart > this.dateFinish) {
        this.invalidate('dateFinish', 'Start date must be less than end date.', this.dateFinish)
    }
    next()
})

seasonSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    await this.execPopulate('grades')
    await Promise.all(this.grades.map(async (grade) => await grade.deleteOne({ _id: grade._id })))
    next()
})

seasonSchema.index({ league: 1, name: 1 }, { unique: true })
module.exports = mongoose.model('Season', seasonSchema)
