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
        default: Date.now,
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

seasonSchema.virtual('status').get(function() {
  if (this.dateFinish <= Date.now()) return 'completed'
  if (this.dateFinish > Date.now() > this.dateStart) return 'progress'
  return 'upcoming'
})

seasonSchema.index({ league: 1, name: 1 }, { unique: true })
module.exports = mongoose.model('Season', seasonSchema)
