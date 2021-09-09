const { ObjectId } = require('mongoose').Types
const Team = require('../models/team')
const Game = require('../models/game')
const PlayerStat = require('../models/playerStat')

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

async function updateGameInProgress(req, res, next) {
    try {

        if (!await allValidDocumentIds(req.params.gameId, Game)) {
            return next({ status: 404, message: 'The game does not exist' })
        }

        const updatedGame = await Game.findOneAndUpdate(
            { _id: req.params.gameId},
            { status: 'progress' },
            { new: true } 
        )

        return res.status(200).json({
            success: true,
            data: updatedGame.status
        })

    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function updateCompletedGame(req, res, next) {
    try {

        let { team1_playerStatIds, team2_playerStatIds } = req.body

        if (!await allValidDocumentIds(req.params.gameId, Game)) {
            return next({ status: 404, message: 'The game does not exist' })
        }

        // checking every single playerStatId
        // adding their points together
        var team1_points = 0
        var team1_playerStat = await Promise.all(
            team1_playerStatIds.map(async (playerStatId) => {
                const foundPlayerStat = ObjectId.isValid(playerStatId) ? await PlayerStat.findById(playerStatId) : null

                if (!foundPlayerStat) {
                    team1_points += foundPlayerStat.points
                }

                return foundPlayerStat
            })
        )

        team2_points = 0
        var team2_playerStat = await Promise.all(
            team2_playerStatIds.map(async (playerStatId) => {
                const foundPlayerStat = ObjectId.isValid(playerStatId) ? await PlayerStat.findById(playerStatId) : null

                if (!foundPlayerStat) {
                    team2_points += foundPlayerStat.points
                }

                return foundPlayerStat
            })
        )

        if (team1_playerStat.includes(null) || team2_playerStat.includes(null)) return next({ status: 404, message: 'Some PlayerStats do not exist' })

        const updatedGame = await Game.findOneAndUpdate(
            { _id: req.params.gameId },
            { team1: { points: team1_points, playerStats: team1_playerStat } },
            { team2: { points: team2_points, playerStats: team2_playerStat } },
            { status: 'completed' },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            data: updatedGame.status
        })

    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = {
    createGame,
    updateGameInProgress,
    updateCompletedGame
}
