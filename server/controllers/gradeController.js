const { ObjectId } = require('mongoose').Types
const Team = require('../models/team')
const Game = require('../models/game')
const Player = require('../models/player')
const PlayerStat = require('../models/playerStat')

async function getGrade(req, res, next) {
    try {
        return res.status(200).json({
            success: true,
            data: req.grade,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function getAllGradeTeams(req, res, next) {
    try {
        const grade = await req.grade.execPopulate('teams')

        return res.status(200).json({
            success: true,
            data: grade.teams,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function addTeamToGrade(req, res, next) {
    try {
        const team = req.team
        // check if team is not in a grade for the season
        const season = await req.season.execPopulate('grades')
        if (season.grades.filter((grade) => grade.teams.includes(team._id.toString())).length > 0)
            return next({ status: 400, message: 'Team already exists in a grade for the season' })

        team.grades.push(req.grade)
        await team.save()
        req.grade.teams.push(team)
        const grade = await req.grade.save()

        return res.status(200).json({
            success: true,
            data: grade,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function createGradeGame(req, res, next) {
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
            { _id: team1_id},
            { $addToSet: { games: game } },
            { new: true } 
        )

        await Team.findOneAndUpdate(
            { _id: team2_id},
            { $addToSet: { games: game } },
            { new: true } 
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

async function updateGame(req, res, next) {
    try {
        let { team1, team2 } = req.body

        const team1_all_playerStats = await createPlayerStats(team1, next)
        const team2_all_playerStats = await createPlayerStats(team2, next)

        const game = req.game
        game.team1.playersStats.push(...team1_all_playerStats)
        game.team2.playersStats.push(...team2_all_playerStats)
        await game.save()

        return res.status(200).json({
            success: true,
            data: game
        })

    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function createPlayerStats(team, next) {
    var allPlayerStats = await Promise.all(Object.keys(team).map(async player_id => {
        const player = ObjectId.isValid(player_id) ? await Player.findById(player_id) : null
        if (!player) return next({ status: 404, message: 'Player does not exist' })

        let playerStats = team[player_id]
        Object.assign(playerStats, { "playerId": player_id })
        const playerStat = new PlayerStat(playerStats)
        await playerStat.save()
        return playerStat
    }))
    return allPlayerStats
}

module.exports = {
    getGrade,
    getAllGradeTeams,
    addTeamToGrade,
    createGradeGame,
    updateGame
}
