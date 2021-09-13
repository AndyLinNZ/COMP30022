const { ObjectId } = require('mongoose').Types
const passport = require('passport')
const series = require('middleware-flow').series
const League = require('../models/league')
const Season = require('../models/season')
const Grade = require('../models/grade')
const Round = require('../models/round')
const Team = require('../models/team')
const Game = require('../models/game')

const ensureAuthenticated = passport.authenticate('jwt', { session: false })

// this middleware checks the request parameters for a game id, round id, grade id,
// season id, or league id and appropriately populates req.round, req.season,
// req.grade, req.round and req.game
// or returns an error otherwise (if not found, or if params not sent in request)
async function getLeagueGradeSeason(req, res, next) {
    if(req.params.gameId) {
        const gameId = req.params.gameId
        var game = ObjectId.isValid(gameId) ? await Game.findById(gameId) : null
        if(!game) return res.status(404).json({ success: false, error: 'Game does not exist' })
        req.game = game
    }
    var roundId = req.params.roundId || req.game?.round._id
    if(roundId) {
        var round = ObjectId.isValid(roundId) ? await Round.findById(roundId) : null
        if(!round) return res.status(404).json({ success: false, error: 'Round does not exist' })
        req.round = round
    }
    var gradeId = req.params.gradeId || req.round?.grade._id
    if(gradeId) {
        var grade = ObjectId.isValid(gradeId) ? await Grade.findById(gradeId) : null
        if(!grade) return res.status(404).json({ success: false, error: 'Grade does not exist' })
        req.grade = grade
    }
    var seasonId = req.params.seasonId || req.grade?.season._id
    if(seasonId) {
        var season = ObjectId.isValid(seasonId) ? await Season.findById(seasonId) : null
        if(!season) return res.status(404).json({ success: false, error: 'Season does not exist' })
        req.season = season
    }
    var leagueId = req.params.leagueId || req.season?.league._id || req.body.leagueId
    if(leagueId) {
        var league = ObjectId.isValid(leagueId) ? await League.findById(leagueId) : null
        if(!league) return res.status(404).json({ success: false, error: 'League does not exist' })
        req.league = league
        return next()
    }
    return res.status(400).json({ success: false, error: 'Invalid request' })
}

// this middleware gets a team document and populates req.team
async function getTeamDocument(req, res, next) {
    const teamId = req.params.teamId ? req.params.teamId : req.body.teamId
    const team = ObjectId.isValid(teamId) ? await Team.findById(teamId) : null
    if(!team) return res.status(404).json({ success: false, error: 'Team does not exist' })
    req.team = team
    return next()
}

async function _ensureLeagueAdmin(req, res, next) {
    try {
        if(req.league.admins.includes(req.user._id)) {
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
        if(req.league.creator._id.equals(req.user._id)) {
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
        if(req.team.admin.equals(req.user._id)) {
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

module.exports = {
    ensureAuthenticated,
    getTeamDocument,
    getLeagueGradeSeason,
    ensureLeagueCreator,
    ensureLeagueAdmin,
    ensureTeamAdmin,
}
