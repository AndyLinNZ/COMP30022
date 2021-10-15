const { ObjectId } = require('mongoose').Types
const Team = require('../models/team')
const Game = require('../models/game')
const Round = require('../models/round')

// returns true if all items in arr are valid object ids
const allValidObjectIds = (arr) => arr.every(ObjectId.isValid)

// returns false if any of the given ids are invalid object ids
// or if any of them do not correspond to a document of docType
// in the database. returns true otherwise
const allValidDocumentIds = async (ids, docType) => {
    if (!allValidObjectIds(ids)) return Promise.resolve(false)
    const docs = await docType.find({
        _id: { $in: ids.map(ObjectId) }
    })
    return Promise.resolve(docs.length === ids.length)
}

// creates a new object containing the key:values specified
// from the original object
const pick = (obj, keys) => {
    var newObj = {}
    keys.forEach(k => {
        newObj[k] = obj[k]
    })
    return newObj
}

// returns an array with each element containing a team
// document, that team's rank in the grade ladder and some
// of their key stats (total points, wins, draws, losses, etc.)
function calculateGradeLadder(grade) {
    var rankings = []
    grade.teams.forEach((team) => {
        var keyStats = calculateTeamGradeStats(grade, team._id)
        rankings.push({
            team: pick(team, ['id', 'name']),
            keyStats
        })
    })

    // sort stats by totalPoints
    rankings.sort((t1, t2) => t2.keyStats.totalPoints - t1.keyStats.totalPoints)

    // assign ranks (teams with same points get the same rank)
    if (rankings.length > 0) {
        var prevRank = 1
        var prevTotalPoints = rankings[0].keyStats.totalPoints
        rankings.forEach((ranking) => {
            if (ranking.keyStats.totalPoints < prevTotalPoints) {
                prevRank += 1
                prevTotalPoints = ranking.keyStats.totalPoints
            }
            ranking['rank'] = prevRank
        })
    }

    return rankings
}

// calculates the key states for a given team in a grade
// at the moment, this is just TotalPoints/Wins/Draws/Losses
function calculateTeamGradeStats(grade, teamid) {
    var keyStats = {
        totalPoints: 0,
        wins: 0,
        draws: 0,
        losses: 0,
    }

    grade.fixture.forEach((round) => {
        round.games.filter(game => game.status === 'completed').forEach((game) => {
            var thisTeam = null
            var oppTeam = null

            if (game.team1.team._id.toString() == teamid.toString()) {
                thisTeam = game.team1
                oppTeam = game.team2
            }
            if (game.team2.team._id.toString() == teamid.toString()) {
                thisTeam = game.team2
                oppTeam = game.team1
            }

            if (!thisTeam || !oppTeam) return

            var thisTeamPoints = calculateTotalPoints(thisTeam.playersStats)
            var oppTeamPoints = calculateTotalPoints(oppTeam.playersStats)

            if (thisTeamPoints > oppTeamPoints) {
                keyStats['wins'] += 1
                keyStats['totalPoints'] += 3
            } else if (thisTeamPoints == oppTeamPoints) {
                keyStats['draws'] += 1
                keyStats['totalPoints'] += 1
            } else if (thisTeamPoints < oppTeamPoints) {
                keyStats['losses'] += 1
            }
        })
    })

    return keyStats
}

function populateGradeGamesTotalPoints(grade) {
    grade.fixture.forEach((round) => {
        round.games.forEach((game) => {
            if (game.team1.playersStats.length == 0) {
                game.team1.totalPoints = -1
            } else {
                const team1TotalPoints = calculateTotalPoints(game.team1.playersStats)
                game.team1.totalPoints = team1TotalPoints
            }
            if (game.team2.playersStats.length == 0) {
                game.team2.totalPoints = -1
            } else {
                const team2TotalPoints = calculateTotalPoints(game.team2.playersStats)
                game.team2.totalPoints = team2TotalPoints
            }
        })
    })
}

function calculateTotalPoints(allStats) {
    return allStats
        .map((playerStat) => playerStat.points || 0)
        .reduce((prevPoint, nextPoint) => prevPoint + nextPoint, 0)
}

async function _createGame(team1Id, team2Id, start, finish, round, locationName, location, next) {
    try {
        const newGame = new Game({
            dateStart: start,
            dateFinish: finish,
            round: round,
            team1: {
                team: team1Id,
            },
            team2: {
                team: team2Id,
            },
            locationName: locationName,
            location: location
        })

        const game = await newGame.save()

        // adding game to team's details
        await Team.findOneAndUpdate(
            { _id: team1Id },
            { $addToSet: { games: game } },
            { new: true },
        )

        await Team.findOneAndUpdate(
            { _id: team2Id },
            { $addToSet: { games: game } },
            { new: true },
        )

        // add the game to the round
        const newRound = await Round.findOneAndUpdate(
            { _id: round._id },
            { $addToSet: { games: game } },
            { new: true },
        )

        return { game: game, round: newRound }
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

async function _createRound(grade, next) {
    try {
        const newRound = new Round({ grade: grade._id })
        const round = await newRound.save()
        grade.fixture.push(round._id)
        await grade.save()

        return round
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

// returns true if a team is in any grade of a season
async function checkTeamInGrade(teamDoc, seasonDoc) {
    const season = await seasonDoc.execPopulate('grades')
    return season.grades.some((grade) => grade.teams.includes(teamDoc._id.toString()))
}

module.exports = {
    allValidDocumentIds,
    pick,
    calculateTotalPoints,
    calculateGradeLadder,
    populateGradeGamesTotalPoints,
    _createGame,
    _createRound,
    checkTeamInGrade
}
