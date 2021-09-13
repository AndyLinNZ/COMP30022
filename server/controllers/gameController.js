const { ObjectId } = require('mongoose').Types
const Player = require('../models/player')
const PlayerStat = require('../models/playerStat')

async function getGame(req, res, next) {
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

async function updateGame(req, res, next) {
    try {
        let { team1, team2 } = req.body

        await req.game.execPopulate('team1.playersStats')
        await req.game.execPopulate('team2.playersStats')
        await updatePlayersStats(req.game.team1.playersStats, team1, next)
        await updatePlayersStats(req.game.team2.playersStats, team2, next)
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
        Object.assign(playerStats, { 'playerId': player_id })
        const playerStat = new PlayerStat(playerStats)
        await playerStat.save()
        oldPlayersStats.push(playerStat)
    }))
    return allPlayerStats
}

module.exports = {
    getGame,
    updateGame,
}