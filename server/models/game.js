const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    dateStart: {
        type: Date,
        default: Date.now,
        required: true,
    },
    dateFinish: {
        type: Date,
        required: true
    },
    gameResults: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'GameResult',
                required: true,
            },
        ],
        default: [],
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
        },
    }
})

gameSchema.virtual('status').get(function() {
  if (this.dateFinish <= Date.now()) return 'completed'
  if (this.dateFinish > Date.now() && Date.now() > this.dateStart) return 'progress'
  return 'upcoming'
})

module.exports = mongoose.model('Game', gameSchema)
