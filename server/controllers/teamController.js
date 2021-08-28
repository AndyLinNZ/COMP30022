const Team = require('../models/team')
const User = require('../models/user')
const Grade = require('../models/grade')

async function createTeam(req, res, next) {

    let { teamName } = req.body

    try {
        const user = req.user

        const newTeam = new Team({
            name: teamName,
            admin: req.user._id,
            grade: req.grade._id
        })

        await newTeam.save()
        req.grade.teams.push(newTeam)
        await req.grade.save()

        return res.status(201).json({
            success: true,
            data: newTeam,
        })

    } catch (err) {
        console.log(err)
        return next(err)
    }
}