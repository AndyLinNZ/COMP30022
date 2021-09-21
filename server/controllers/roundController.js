const { ObjectId } = require('mongoose').Types
const Team = require('../models/team')
const Game = require('../models/game')
const Round = require('../models/round')

async function getRound(req, res, next) {
    try {
        return res.status(200).json({
            success: true,
            data: req.round,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function deleteRound(req, res, next) {
    try {
        await req.round.deleteOne({ _id: req.round._id })
        return res.status(204).send()
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function createGame(req, res, next) {
    try {
        let { start, finish, venue_name, game_location, team1_id, team2_id } = req.body

        const team1 = ObjectId.isValid(team1_id) ? await Team.findById(team1_id) : null
        const team2 = ObjectId.isValid(team2_id) ? await Team.findById(team2_id) : null

        if (!team1 || !team2) return next({ status: 404, message: 'Team does not exist' })

        const newGame = new Game({
            dateStart: start,
            dateFinish: finish,
            round: req.round,
            team1: {
                team: team1_id,
            },
            team2: {
                team: team2_id,
            },
            locationName: venue_name,
            location: game_location
        })

        const game = await newGame.save()

        // adding game to team's details
        await Team.findOneAndUpdate(
            { _id: team1_id },
            { $addToSet: { games: game } },
            { new: true },
        )

        await Team.findOneAndUpdate(
            { _id: team2_id },
            { $addToSet: { games: game } },
            { new: true },
        )

        // add the game to the round
        await Round.findOneAndUpdate(
            { _id: req.round._id },
            { $addToSet: { games: game } },
            { new: true },
        )

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
    getRound,
    deleteRound,
    createGame,
}
