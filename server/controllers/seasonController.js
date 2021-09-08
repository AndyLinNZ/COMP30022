const Season = require('../models/season')
const Grade = require('../models/grade')

async function getSeason(req, res, next) {
    try {
        return res.status(200).json({
            success: true,
            data: req.season,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function createGrade(req, res, next) {
    try {
        let { gradeName, gradeGender, gradeDifficulty } = req.body

        const newGrade = new Grade({
            name: gradeName,
            gender: gradeGender,
            difficulty: gradeDifficulty,
            season: req.season._id,
        })

        const grade = await newGrade.save()
        req.season.grades.push(newGrade)
        await req.season.save()

        return res.status(201).json({
            success: true,
            data: grade,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function getAllSeasonGrades(req, res, next) {
    try {
        const season = await req.season.execPopulate('grades')

        return res.status(200).json({
            success: true,
            data: season.grades,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function updateSeason(req, res, next) {
    try {
        let { seasonName, seasonStart, seasonFinish, seasonStatus } = req.body
		
		const updateQuery = {}
		if (seasonName) updateQuery.name = seasonName
		if (seasonStart) updateQuery.dateStart = seasonStart
		if (seasonFinish) updateQuery.dateFinish = seasonFinish
		if (seasonStatus) updateQuery.status = seasonStatus

        const season = await Season.findOneAndUpdate(
            { _id: req.season._id },
            { $set: updateQuery },
            { new: true, runValidators: true }
        )
		
        return res.status(200).json({
            success: true,
            data: season,
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
	updateSeason
}
