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

module.exports = {
    getGrade,
    getAllGradeTeams,
    addTeamToGrade,
}
