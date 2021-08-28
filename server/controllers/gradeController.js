const Grade = require('../models/grade')
const Team = require('../models/team')

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

// TODO: move this to a separate endpoint and decouple it from grades
// Won't be writing a test for this atm until its refactored
async function createTeam(req, res, next) {
    let { teamName } = req.body
    try {
        const newTeam = new Team({
            name: teamName,
            grade: req.grade._id,
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

module.exports = {
    getGrade,
    createTeam,
    getAllGradeTeams,
}
