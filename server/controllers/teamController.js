const Team = require('../models/team')

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

module.exports = {
    createTeam,
    getTeam,
    updateTeam,
}
