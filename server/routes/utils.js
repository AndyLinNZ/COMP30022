const passport = require('passport')
const League = require('../models/league')
const Season = require('../models/season')
const Grade = require('../models/grade')

// from https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const ensureAuthenticated = passport.authenticate('jwt', { session: false })

// this middleware checks the request parameters for a league id, grade id, or season id
// and appropriately populates req.league, req.grade and req.season
// or returns an error otherwise (if not found, or if params not sent in request)
async function getLeagueGradeSeason(req, res, next) {
    if (req.params.gradeId) {
        const grade = await Grade.findById(req.params.gradeId)
        if (!grade) return res.status(404).json({ success: false, error: 'Grade does not exist' })
        req.grade = grade
    }
    var seasonId = req.params.seasonId || req.grade?.season._id
    if (seasonId) {
        const season = await Season.findById(seasonId)
        if (!season) return res.status(404).json({ success: false, error: 'Season does not exist' })
        req.season = season
    }
    var leagueId = req.params.leagueId || req.season?.league._id
    if (leagueId) {
        const league = await League.findById(leagueId)
        if (!league) return res.status(404).json({ success: false, error: 'League does not exist' })
        req.league = league
        return next()
    }
    return res.status(400).json({ success: false, error: 'Invalid request' })
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

const ensureLeagueAdmin = pipe(getLeagueGradeSeason, _ensureLeagueAdmin)
const ensureLeagueCreator = pipe(getLeagueGradeSeason, _ensureLeagueCreator)

module.exports = {
    ensureAuthenticated,
    getLeagueGradeSeason,
    ensureLeagueCreator,
    ensureLeagueAdmin,
}
