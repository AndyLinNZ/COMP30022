const { ObjectId } = require('mongoose').Types
const Team = require('../models/team')
const Game = require('../models/game')
const Player = require('../models/player')
const PlayerStat = require('../models/playerStat')
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

async function getRoundGame(req, res, next) {

    try {
        return res.status(200).json({
            success: true,
            data: req.game,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }

}

async function createRoundGame(req, res, next) {
    try {
        let { start, finish, venue_name, game_location, team1_id, team2_id } = req.body

        const team1 = ObjectId.isValid(team1_id) ? await Team.findById(team1_id) : null
        const team2 = ObjectId.isValid(team2_id) ? await Team.findById(team2_id) : null

        if (!team1 || !team2) return next({ status: 404, message: 'Team does not exist' })

        const newGame = new Game({
            dateStart: start,
            dateFinish: finish,
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

async function updateRoundGame(req, res, next) {
    try {
        let { team1, team2 } = req.body

        await req.game.execPopulate('team1.playersStats')
        await req.game.execPopulate('team2.playersStats')
        await updatePlayersStats(req.game.team1.playersStats, team1, next)
        await updatePlayersStats(req.game.team2.playersStats, team2, next)
        await req.game.save()

        return res.status(200).json({
            success: true,
            data: req.game,
        })

    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function updatePlayersStats(oldPlayersStats, team, next) {
    var allPlayerStats = await Promise.all(Object.keys(team).map(async player_id => {
        const player = ObjectId.isValid(player_id) ? await Player.findById(player_id) : null
        if (!player) return next({ status: 404, message: 'Player does not exist' })

        // check if player stats already exists
        var existingPS = oldPlayersStats.find(v1 => v1.playerId == player_id)
        if(existingPS) {
            Object.assign(existingPS, team[player_id])
            return existingPS.save()
        }

        // otherwise, create new playerStats document and add it
        let playerStats = team[player_id]
        Object.assign(playerStats, { "playerId": player_id })
        const playerStat = new PlayerStat(playerStats)
        await playerStat.save()
        oldPlayersStats.push(playerStat)
    }))
    return allPlayerStats
}

module.exports = {
    getRound,
    getRoundGame,
    createRoundGame,
    updateRoundGame,
}
