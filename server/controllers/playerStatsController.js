const { ObjectId } = require('mongoose').Types
const PlayerStat = require('../models/playerStat')
const Player = require('../models/player')

async function createPlayerStat(req, res, next) {
    try {
        let { player_id, num_points, num_assists, 
            num_off_rebounds, num_def_rebounds, num_steals, 
            num_blocks, num_fgm, num_fga, num_turnover, 
            num_fouls, num_pm, num_minutes } = req.body

        const player = ObjectId.isValid(player_id) ? await Player.findById(player_id) : null
        if (!player) return next({ status: 404, message: 'Player does not exist' })

        const newPlayerStat = new PlayerStat({
            playerId: player,
            points: num_points,
            assists: num_assists,
            rebounds: { 
                offensive: num_off_rebounds, 
                defensive: num_def_rebounds 
            },
            steals: num_steals,
            blocks: num_blocks,
            fieldGoalMade: num_fgm,
            fieldGoalAttempts: num_fga,
            turnOvers: num_turnover,
            personalFouls: num_fouls,
            plusMinus: num_pm,
            minutesPlayed: num_minutes
        })

        const playerStat = await newPlayerStat.save()

        return res.status(201).json({
            success: true,
            data: playerStat,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = {
    createPlayerStat
}