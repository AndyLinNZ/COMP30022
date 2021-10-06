const { _createRound, _createGame } = require('./utils')
const { calculateGradeLadder } = require('./utils')
const {
    TeamNode,
    teamDocsToGoOnBye,
    ejectNextDateAndLocation,
    ejectNextTeamNode,
} = require('../services/generateFixture')

async function getRound(req, res, next) {
    try {
        const grade = await req.grade.execPopulate('fixture')
        const roundNum = (parseInt(req.params.roundNum) || 0) - 1
        if (roundNum < 0 || roundNum >= grade.fixture.length) {
            next({ status: 400, message: 'Invalid round number' })
        }

        const round = await grade.fixture[roundNum].execPopulate('games')
        return res.status(200).json({
            success: true,
            data: round,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function getGrade(req, res, next) {
    try {
        const populateQuery = [
            'teams',
            {
                path: 'fixture',
                populate: {
                    path: 'games',
                    model: 'Game',
                    populate: [
                        {
                            path: 'team1.playersStats',
                            model: 'PlayerStat',
                        },
                        {
                            path: 'team2.playersStats',
                            model: 'PlayerStat',
                        },
                    ],
                },
            },
        ]
        const grade = await req.grade.execPopulate(populateQuery)

        const ladder = calculateGradeLadder(grade)
        grade.ladder = ladder

        return res.status(200).json({
            success: true,
            data: grade,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function deleteGrade(req, res, next) {
    try {
        await req.grade.deleteOne({ _id: req.grade._id })

        return res.status(204).send()
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
        if (await checkTeamInGrade(req.team, req.season)) {
            return next({ status: 400, message: 'Team already exists in a grade for the season' })
        }
        const grade = await _addTeamToGrade(req.team, req.grade)

        return res.status(200).json({
            success: true,
            data: grade,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function createRound(req, res, next) {
    try {
        const round = await _createRound(req.grade, next)

        return res.status(201).json({
            success: true,
            data: round,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function createFixture(req, res, next) {
    try {
        const { teams, grade, body: { numRounds, datesAndLocations } } = req

        for (const team of teams) {
            if (await checkTeamInGrade(team, req.season)) {
                return next({ status: 400, message: 'Team already exists in a grade for the season' })
            }
        }

        for (const team of teams) {
            await _addTeamToGrade(team, grade)
        }

        const numGames = Math.min(Math.floor(teams.length / 2), datesAndLocations.length)
        const allTeams = teams.map((team) => new TeamNode(team._id))

        // sort dates in place just once before using a priority queue
        datesAndLocations.sort((dl1, dl2) => new Date(dl1.dateStart) - new Date(dl2.dateStart))

        for (var i = 0; i < numRounds; i++) {
            var round = await _createRound(grade, next)
            for (var j = 0; j < numGames; j++) {
                const team = ejectNextTeamNode(allTeams)
                const opponent = team.nextTeamToPlay(allTeams)

                team.playTeam(opponent)
                opponent.playTeam(team)

                const { location, locationName, dateStart, dateFinish } =
                    ejectNextDateAndLocation(datesAndLocations, i)

                const { round: newRound } = await _createGame(
                    team.teamId,
                    opponent.teamId,
                    dateStart,
                    dateFinish,
                    round,
                    locationName,
                    location,
                    next
                )
                round = newRound
            }
            await round.execPopulate('games')

            const teamsOnBye = teamDocsToGoOnBye(round.games, teams)
            round.teamsOnBye = round.teamsOnBye.concat(teamsOnBye)
            await round.save()
        }

        await grade.execPopulate('fixture')
        return res.status(201).json({
            success: true,
            data: grade.fixture
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function _addTeamToGrade(teamDoc, gradeDoc) {
    teamDoc.grades.push(gradeDoc)
    await teamDoc.save()
    gradeDoc.teams.push(teamDoc)
    return await gradeDoc.save()
}

async function checkTeamInGrade(teamDoc, seasonDoc) {
    const season = await seasonDoc.execPopulate('grades')
    return season.grades.some((grade) => grade.teams.includes(teamDoc._id.toString()))
}

module.exports = {
    getRound,
    getGrade,
    getAllGradeTeams,
    addTeamToGrade,
    createRound,
    deleteGrade,
    createFixture,
}
