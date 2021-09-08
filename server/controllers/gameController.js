const { ObjectId } = require('mongoose').Types
const Team = require('../models/team')
const Game = require('../models/game')

async function createGame(req, res, next) {
    try {
        let { start, finish, venue_name, venue_coord, team1_id, team2_id } = req.body

        const team1 = ObjectId.isValid(team1_id) ? await Team.findById(team1_id) : null
        const team2 = ObjectId.isValid(team2_id) ? await Team.findById(team2_id) : null

        if (!team1 || !team2) return next({ status: 404, message: 'Team does not exist' })

        const newGame = new Game({
            dateStart: start,
            dateFinished: finish,
            team1: {
                team: team1_id,
            },
            team2: {
                team: team2_id,
            },
            locationName: venue_name,
            location: {
                type: 'Point',
                coordinates: venue_coord
            },
        })

        const game = await newGame.save()

        return res.status(201).json({
            success: true,
            data: game,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = {
    createGame
}
