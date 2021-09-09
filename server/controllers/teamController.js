const Team = require('../models/team')
const Player = require('../models/player')
const player = require('../models/player')
const GameResult = require('../models/gameResult')
const { allValidDocumentIds } = require('./utils')

async function createTeam(req, res, next) {
    try {
        let { teamName } = req.body
        const newTeam = new Team({
            name: teamName,
            admin: req.user._id,
            grades: [],
            players: [],
        })

        const team = await newTeam.save()
        req.user.teams.push(team)
        await req.user.save()

        return res.status(201).json({
            success: true,
            data: team,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function getTeam(req, res, next) {
    try {
        return res.status(200).json({
            success: true,
            data: req.team,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

// TODO
async function updateTeam(req, res, next) {
    try {
        return res.status(200).json({
            success: true,
            data: req.team,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function addPlayerToTeam(req, res, next) {
   try {
        if (!await allValidDocumentIds(req.body.playerIds, Player)) {
            return next({ status: 404, message: 'Some players do not exist' })
        }

        var newPlayers = await Promise.all(
            req.body.playerIds.map(async (playerId) => {
                const player = await Player.findOneAndUpdate(
                    { _id: playerId },
                    { team: req.team._id }
                )
                return player
            })
        )

        const team = await Team.findOneAndUpdate(
            { _id: req.team._id },
            { $addToSet: { players: newPlayers } },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            data: team.players
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function deletePlayersFromTeam(req, res, next) {
    try {
        if (!await allValidDocumentIds(req.body.playerIds, Player)) {
            return next({ status: 404, message: 'Some players do not exist' })
        }

        var toDeletePlayers = await Promise.all(
            req.body.playerIds.map(async (playerId) => {
                const player = await Player.findOneAndUpdate(
                    { _id: playerId },
                    { team: null }
                )
                return player
            })
        )

        const team = await Team.findOneAndUpdate(
            { _id: req.team._id },
            { $pull: { players: { $in: toDeletePlayers } } },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            data: team.players
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = {
    createTeam,
    getTeam,
    updateTeam,
    addPlayerToTeam,
    deletePlayersFromTeam,
}
