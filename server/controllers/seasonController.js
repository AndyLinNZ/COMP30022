const Season = require('../models/season')
const Grade = require('../models/grade')

async function getSeason(req, res, next) {
    try {
        const season = await Season.findById(req.params.seasonId)
        if (!season) return next({ status: 404, message: 'Season does not exist' })

        return res.status(200).json({
            success: true,
            data: season,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function createGrade(req, res, next) {
    let { name, gender, difficulty } = req.body
    try {
        const season = await Season.findById(req.params.seasonId)
        if (!season) return next({ status: 404, message: 'Season does not exist' })
        if (!['male', 'female', 'mixed'].indexOf(gender))
            return next({ status: 400, message: 'Invalid gender grade' })
        if (!['A', 'B', 'C', 'D', 'E'].indexOf(difficulty))
            return next({ status: 400, message: 'Invalid difficulty' })

        const newGrade = new Grade({
            name: name,
            gradeGender: gender,
            difficulty: difficulty,
            season: season,
        })
        await newGrade.save()
        season.grades.push(newGrade)
        await season.save()

        return res.status(201).json({
            success: true,
            data: newGrade,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function getAllSeasonGrades(req, res, next) {
    try {
        const season = await Season.findById(req.params.seasonId)
        if (!season) return next({ status: 404, message: 'Season does not exist' })

        return res.status(200).json({
            success: true,
            data: season.grades,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = {
    getSeason,
    createGrade,
    getAllSeasonGrades,
}
