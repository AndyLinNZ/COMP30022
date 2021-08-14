const passport = require('passport')
const League = require('./models/league')

const ensureAuthenticated = passport.authenticate('jwt', { session: false })

const ensureAdmin = async (req, res, next) => {
    try {
        const league = await League.findById(req.params.leagueId)
        if (!league) return res.status(404).json({ message: 'League does not exist' })

        if (league.admins.includes(req.user._id)) {
            next()
        } else {
            return res.status(403).json({ message: 'User is not an admin' })
        }
    } catch (err) {
        next(err)
    }
}

const ensureCreator = async (req, res, next) => {
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

module.exports = {
    ensureCreator,
    ensureAdmin,
    ensureAuthenticated,
}
