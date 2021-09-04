const { ObjectId } = require('mongoose').Types
const passport = require('passport')
const series = require('middleware-flow').series
const League = require('../models/league')
const Season = require('../models/season')
const Grade = require('../models/grade')
const Team = require('../models/team')

const ensureAuthenticated = passport.authenticate('jwt', { session: false })

// this middleware checks the request parameters for a league id, grade id, or season id
// and appropriately populates req.league, req.grade, and req.season
// or returns an error otherwise (if not found, or if params not sent in request)
async function getLeagueGradeSeason(req, res, next) {
    var validId
    if (req.params.gradeId) {
        validId = ObjectId.isValid(req.params.gradeId)
        var grade
        if (validId) grade = await Grade.findById(req.params.gradeId)
        if (!grade || !validId)
            return res.status(404).json({ success: false, error: 'Grade does not exist' })
        req.grade = grade
    }
    var seasonId = req.params.seasonId || req.grade?.season._id
    if (seasonId) {
        validId = ObjectId.isValid(seasonId)
        var season
        if (validId) season = await Season.findById(seasonId)
        if (!season || !validId)
            return res.status(404).json({ success: false, error: 'Season does not exist' })
        req.season = season
    }
    var leagueId = req.params.leagueId || req.season?.league._id
    if (leagueId) {
        validId = ObjectId.isValid(leagueId)
        var league
        if (validId) league = await League.findById(leagueId)
        if (!league || !validId)
            return res.status(404).json({ success: false, error: 'League does not exist' })
        req.league = league
        return next()
    }
    return res.status(400).json({ success: false, error: 'Invalid request' })
}

async function getTeamDocument(req, res, next) {
    const teamId = req.params.teamId ? req.params.teamId : req.body.teamId
    const team = ObjectId.isValid(teamId) ? await Team.findById(teamId) : null
    if (!team) return res.status(404).json({ success: false, error: 'Team does not exist' })
    req.team = team
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
            return res.status(403).json({ success: false, error: 'User is not an admin' })
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ success: false, error: 'Invalid request' })
    }
}

const ensureLeagueAdmin = series(getLeagueGradeSeason, _ensureLeagueAdmin)
const ensureLeagueCreator = series(getLeagueGradeSeason, _ensureLeagueCreator)
const ensureTeamAdmin = series(getTeamDocument, _ensureTeamAdmin)

module.exports = {
    ensureAuthenticated,
    getTeamDocument,
    getLeagueGradeSeason,
    ensureLeagueCreator,
    ensureLeagueAdmin,
    ensureTeamAdmin,
}
