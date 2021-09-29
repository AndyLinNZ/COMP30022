const { ObjectId } = require('mongoose').Types
const Team = require('../models/team')
const { _createGame } = require('./utils')

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

        const game = await _createGame(team1_id, team2_id, start, finish, req.round, venue_name, game_location, next)

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
