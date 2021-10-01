const { ObjectId } = require('mongoose').Types
const passport = require('passport')
const series = require('middleware-flow').series
const League = require('../models/league')
const Season = require('../models/season')
const Grade = require('../models/grade')
const Round = require('../models/round')
const Team = require('../models/team')
const Game = require('../models/game')
const { allValidDocumentIds } = require('../controllers/utils')

const ensureAuthenticated = passport.authenticate('jwt', { session: false })

// this middleware checks the request parameters for a game id, round id, grade id,
// season id, or league id and appropriately populates req.round, req.season,
// req.grade, req.round and req.game
// or returns an error otherwise (if not found, or if params not sent in request)
async function getLeagueGradeSeason(req, res, next) {
    if (req.params.gameId) {
        const gameId = req.params.gameId
        var game = ObjectId.isValid(gameId) ? await Game.findById(gameId) : null
        if (!game) return res.status(404).json({ success: false, error: 'Game does not exist' })
        req.game = game
    }
    var roundId = req.params.roundId || req.game?.round._id
    if (roundId) {
        var round = ObjectId.isValid(roundId) ? await Round.findById(roundId) : null
        if (!round) return res.status(404).json({ success: false, error: 'Round does not exist' })
        req.round = round
    }
    var gradeId = req.params.gradeId || req.round?.grade._id
    if (gradeId) {
        var grade = ObjectId.isValid(gradeId) ? await Grade.findById(gradeId) : null
        if (!grade) return res.status(404).json({ success: false, error: 'Grade does not exist' })
        req.grade = grade
    }
    var seasonId = req.params.seasonId || req.grade?.season._id
    if (seasonId) {
        var season = ObjectId.isValid(seasonId) ? await Season.findById(seasonId) : null
        if (!season) return res.status(404).json({ success: false, error: 'Season does not exist' })
        req.season = season
    }
    var leagueId = req.params.leagueId || req.season?.league?._id || req.body.leagueId
    if (leagueId) {
        var league = ObjectId.isValid(leagueId) ? await League.findById(leagueId) : null
        if (!league) return res.status(404).json({ success: false, error: 'League does not exist' })
        req.league = league
        return next()
    }
    return res.status(400).json({ success: false, error: 'Invalid request' })
}

// this middleware gets a team document and populates req.team
async function getTeamDocument(req, res, next) {
    const teamId = req.params.teamId ? req.params.teamId : req.body.teamId
    const team = ObjectId.isValid(teamId) ? await Team.findById(teamId) : null
    if (!team) return res.status(404).json({ success: false, error: 'Team does not exist' })
    req.team = team
    return next()
}

// this middleware checks if the given teamIds are actual documents, and if so, populate them
// it will check the req parameters and some grade checks
async function _validateFixture(req, res, next) {
    const { dateStart, dateFinish } = req.season
    const { teamIds, numRounds, datesAndLocations } = req.body

    // Check there is no existing fixture yet
    if (req.grade.fixture.length !== 0) {
        return res.status(400).json({ success: false, error: 'This grade already has a fixture' })
    }
    // Check we have at least 2 teams for the fixture
    if (teamIds.length < 2) {
        return res.status(400).json({ success: false, error: 'Need at least 2 teams' })
    }
    // Check valid teams
    if (!(await allValidDocumentIds(teamIds, Team))) {
        return res.status(404).json({ success: false, error: 'Some team does not exist' })
    }
    // Check team is added to grade
    const notAdded = teamIds.some((team) => !req.grade.teams.includes(team))
    if (notAdded) {
        return res.status(400).json({ success: false, error: 'Team is not added to grade' })
    }
    // Check we have dates and locations
    const noDateOrLocations = !datesAndLocations || datesAndLocations.length === 0 ||
        datesAndLocations.some((dl) => !dl.dateStart || !dl.dateFinish || !dl.locationName || !dl.location)
    if (noDateOrLocations) {
        return res.status(400).json({ success: false, error: 'Dates and locations are invalid' })
    }
    // Check we have valid numRounds
    if (!numRounds || numRounds <= 0) {
        return res.status(400).json({ success: false, error: 'numRounds is invalid' })
    }
    // Check number of rounds can fit within season
    if (dateStart.setDate(dateStart.getDate() + numRounds * 7) > dateFinish) {
        return res.status(400).json({ success: false, error: 'numRounds cannot fit within the season' })
    }

    req.teams = await Promise.all(teamIds.map(async (teamId) => await Team.findById(teamId)))
    return next()
}

async function _ensureLeagueAdmin(req, res, next) {
    try {
        if (req.league.admins.includes(req.user._id)) {
            next()
        } else {
            return res.status(403).json({ success: false, error: 'User is not an admin' })
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ success: false, error: 'Invalid request' })
    }
}

async function _ensureLeagueCreator(req, res, next) {
    try {
        if (req.league.creator._id.equals(req.user._id)) {
            next()
        } else {
            return res.status(403).json({ success: false, error: 'User is not a creator' })
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ success: false, error: 'Invalid request' })
    }
}

async function _ensureTeamAdmin(req, res, next) {
    try {
        if (req.team.admin.equals(req.user._id)) {
            next()
        } else {
            return res.status(403).json({ success: false, error: 'User is not a team admin' })
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ success: false, error: 'Invalid request' })
    }
}

const ensureLeagueAdmin = series(getLeagueGradeSeason, _ensureLeagueAdmin)
const ensureLeagueCreator = series(getLeagueGradeSeason, _ensureLeagueCreator)
const ensureTeamAdmin = series(getTeamDocument, _ensureTeamAdmin)
const validateFixture = series(ensureLeagueAdmin, _validateFixture)

module.exports = {
    ensureAuthenticated,
    getTeamDocument,
    getLeagueGradeSeason,
    ensureLeagueCreator,
    ensureLeagueAdmin,
    ensureTeamAdmin,
    validateFixture
}
