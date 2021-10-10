const Team = require('../models/team')
const Grade = require('../models/grade')
const Player = require('../models/player')
const { allValidDocumentIds, checkTeamInGrade } = require('./utils')

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

async function getAllTeams(req, res, next) {
    try {
        var teams = await Team.find()

        const gradeId = req.query?.grade
        if (gradeId && allValidDocumentIds([gradeId], Grade)) {
            const filteredTeams = teams.filter(team => team.grades.includes(gradeId))
            var unwantedTeams = []
            for (const team of filteredTeams) {
                await team.execPopulate('grades')
                for (const grade of team.grades) {
                    if (await checkTeamInGrade(team, null, grade.season)) {
                        if (!unwantedTeams.includes(team)) unwantedTeams.push(team)
                    }
                }
            }
            teams = teams.filter(team => !unwantedTeams.some(uTeam => uTeam._id == team._id))
        }

        return res.status(200).json({
            success: true,
            data: teams
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function updateTeam(req, res, next) {
    try {
        let { teamName } = req.body

        const updateQuery = {}
        if (teamName) updateQuery.name = teamName

        const team = await Team.findOneAndUpdate(
            { _id: req.team._id },
            { $set: updateQuery },
            { new: true, runValidators: true }
        )

        return res.status(200).json({
            success: true,
            data: team,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function addPlayerToTeam(req, res, next) {
    try {
        var newPlayers = await Promise.all(
            req.body.playerNames.map(async ({ playerName }) => {
                const newPlayer = new Player({
                    name: playerName,
                })
                const player = await newPlayer.save()
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
            data: team.players,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function deletePlayersFromTeam(req, res, next) {
    try {
        if (!(await allValidDocumentIds(req.body.playerIds, Player))) {
            return next({ status: 404, message: 'Some players do not exist' })
        }

        var toDeletePlayers = await Promise.all(
            req.body.playerIds.map(async (playerId) => {
                const player = await Player.findOneAndUpdate({ _id: playerId }, { team: null })
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
            data: team.players,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = {
    createTeam,
    getTeam,
    getAllTeams,
    updateTeam,
    addPlayerToTeam,
    deletePlayersFromTeam,
}
