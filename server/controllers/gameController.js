const { ObjectId } = require('mongoose').Types
const Player = require('../models/player')
const Game = require('../models/game')
const PlayerStat = require('../models/playerStat')
const { formatGameResp } = require('./responseFormatters')
const { calculateTotalPoints } = require('./utils')

async function getGame(req, res, next) {
    try {
        const populateQuery = [
            {
                path: 'team1.team',
                model: 'Team',
            },
            {
                path: 'team1.team',
                populate: {
                    path: 'players',
                    model: 'Player',
                },
            },
            {
                path: 'team1.playersStats',
                model: 'PlayerStat',
            },
            {
                path: 'team1.playersStats',
                populate: {
                    path: 'playerId',
                    model: 'Player',
                },
            },
            {
                path: 'team2.team',
                model: 'Team',
            },
            {
                path: 'team2.team',
                populate: {
                    path: 'players',
                    model: 'Player',
                },
            },
            {
                path: 'team2.playersStats',
                model: 'PlayerStat',
            },
            {
                path: 'team2.playersStats',
                populate: {
                    path: 'playerId',
                    model: 'Player',
                },
            },
        ]
        const game = await req.game.execPopulate(populateQuery)
        game.team1.totalPoints = calculateTotalPoints(game.team1.playersStats)
        game.team2.totalPoints = calculateTotalPoints(game.team2.playersStats)
        game.paths = {
            leagueId: req.league._id,
            seasonId: req.season._id,
            gradeId: req.grade._id
        }
        return res.status(200).json({
            success: true,
            data: formatGameResp(game),
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function updateGamePlayerStats(req, res, next) {
    try {
        let { team1, team2 } = req.body

        await req.game.execPopulate('team1.playersStats')
        await req.game.execPopulate('team2.playersStats')
        await updatePlayersStats(req.game.team1.playersStats, team1, next)
        await updatePlayersStats(req.game.team2.playersStats, team2, next)
        req.game.team1.totalPoints = calculateTotalPoints(req.game.team1.playersStats)
        req.game.team2.totalPoints = calculateTotalPoints(req.game.team2.playersStats)
        const game = await req.game.save()

        return res.status(200).json({
            success: true,
            data: game,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function updatePlayersStats(oldPlayersStats, team, next) {
    var allPlayerStats = await Promise.all(
        Object.keys(team || {}).map(async (player_id) => {
            const player = ObjectId.isValid(player_id) ? await Player.findById(player_id) : null
            if (!player) return next({ status: 404, message: 'Player does not exist' })

            // check if player stats already exists
            var existingPS = oldPlayersStats.find((v1) => v1.playerId == player_id)
            if (existingPS) {
                Object.assign(existingPS, team[player_id])
                return existingPS.save()
            }

            // otherwise, create new playerStats document and add it
            let playerStats = team[player_id]
            Object.assign(playerStats, { playerId: player_id })
            const playerStat = new PlayerStat(playerStats)
            await playerStat.save()
            oldPlayersStats.push(playerStat)
        })
    )
    return allPlayerStats
}

async function updateGameDateLocation(req, res, next) {
    try {
        let { newLocationName, newLocation, newStart, newFinish } = req.body

        const updateQuery = {}
        if (newLocationName) updateQuery.locationName = newLocationName
        if (newLocation) updateQuery.location = newLocation
        if (newStart) updateQuery.dateStart = newStart
        if (newFinish) updateQuery.dateFinish = newFinish

        const game = await Game.findOneAndUpdate(
            { _id: req.game._id },
            { $set: updateQuery },
            { new: true, runValidators: true }
        )

        return res.status(200).json({
            success: true,
            data: game,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = {
    getGame,
    updateGameDateLocation,
    updateGamePlayerStats,
}
