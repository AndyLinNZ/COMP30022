const Grade = require('../models/grade')
const Team = require('../models/team')

async function getGrade(req, res, next) {
    try {
        const grade = await Grade.findById(req.params.gradeId)
        if (!grade) return next({ status: 404, message: 'Grade does not exist' })

        return res.status(200).json({
            success: true,
            data: grade,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function createTeam(req, res, next) {
    let { teamName } = req.body
    try {
        const grade = await Grade.findById(req.params.gradeId)
        if (!grade) return next({ status: 404, message: 'Grade does not exist' })

        const newTeam = new Team({
            name: teamName,
            grade: grade,
        })
        await newTeam.save()
        grade.teams.push(newTeam)
        await grade.save()

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
        const grade = await Grade.findById(req.params.gradeId)
        if (!grade) return next({ status: 404, message: 'Grade does not exist' })

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
