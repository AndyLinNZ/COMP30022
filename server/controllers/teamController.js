const Team = require('../models/team')
const User = require('../models/user')
const Grade = require('../models/grade')

async function createTeam(req, res, next) {
    try {
        let { teamName } = req.body
        const newTeam = new Team({
            name: teamName,
            admin: req.user._id,
            grades: [],
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

module.exports = {
    createTeam,
}
