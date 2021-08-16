const passport = require('passport')
const League = require('../models/league')
const Season = require('../models/season')

const ensureAuthenticated = passport.authenticate('jwt', { session: false })

async function ensureAdmin(req, res, next) {
    try {
        const leagueId = determineLeague(req.params)
        const league = await League.findById(leagueId)
        if (!league) return res.status(404).json({ message: 'League does not exist' })

        if (league.admins.includes(req.user._id)) {
            next()
        } else {
            return res.status(403).json({ message: 'User is not an admin' })
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
}

async function ensureCreator(req, res, next) {
    try {
        const league = await League.findById(req.params.leagueId)
        if (!league) return res.status(404).json({ message: 'League does not exist' })

        if (league.creator._id.equals(req.user._id)) {
            next()
        } else {
            return res.status(403).json({ message: 'User is not a creator' })
        }
    } catch (err) {
        next(err)
    }
}

async function determineLeague(params) {
    if (params.seasonId) {
        const season = await Season.findById(params.seasonId)
        if (!season) return res.status(404).json({ message: 'Season does not exist' })
        return season.leagueId
    }
    if (params.leagueId) {
        return params.leagueId
    }
    return res.status(404).json({ message: 'Invalid request' })
}

module.exports = {
    ensureCreator,
    ensureAdmin,
    ensureAuthenticated,
}
