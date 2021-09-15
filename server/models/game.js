const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    dateStart: {
        type: Date,
        default: Date.now,
        required: true,
    },
    dateFinish: {
        type: Date,
        required: true,
    },
    round: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Round',
        required: true,
    },
    team1: {
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            required: true,
        },
        playersStats: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'PlayerStat',
                    required: true,
                },
            ],
            default: [],
        },
    },
    team2: {
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            required: true,
        },
        playersStats: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'PlayerStat',
                    required: true,
                },
            ],
            default: [],
        },
    },
    locationName: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
        },
    },
})

gameSchema.virtual('status').get(function () {
    if (this.dateFinish <= Date.now()) return 'completed'
    if (this.dateFinish > Date.now() && Date.now() > this.dateStart) return 'active'
    return 'upcoming'
})

gameSchema.pre('validate', function (next) {
    if (this.dateStart >= this.dateFinish) {
        this.invalidate('dateFinish', 'Start date must be less than end date.', this.dateFinish)
    }
    next()
})

module.exports = mongoose.model('Game', gameSchema)
