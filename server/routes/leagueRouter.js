const express = require('express')
const {
    getLeagueGradeSeason,
    ensureAuthenticated,
    ensureLeagueAdmin,
    ensureLeagueCreator,
} = require('./utils')
const leagueController = require('../controllers/leagueController.js')

const leagueRouter = express.Router()

// GET
leagueRouter.get('/', leagueController.getAllLeagues)
leagueRouter.get('/:leagueId', getLeagueGradeSeason, leagueController.getLeague)
leagueRouter.get('/:leagueId/season', getLeagueGradeSeason, leagueController.getAllLeagueSeasons)

// POST
leagueRouter.post('/', ensureAuthenticated, leagueController.createLeague)
leagueRouter.post(
    '/:leagueId/season',
    ensureAuthenticated,
    ensureLeagueAdmin,
    leagueController.createLeagueSeason
)
leagueRouter.post(
    '/:leagueId/admin',
    ensureAuthenticated,
    ensureLeagueCreator,
    leagueController.createLeagueAdmins
)

// UPDATE
leagueRouter.patch(
    '/:leagueId',
    ensureAuthenticated,
    ensureLeagueAdmin,
    leagueController.updateLeague
)

// DELETE
leagueRouter.delete(
    '/:leagueId',
    ensureAuthenticated,
    ensureLeagueCreator,
    leagueController.deleteLeague
)
leagueRouter.delete(
    '/:leagueId/admin',
    ensureAuthenticated,
    ensureLeagueCreator,
    leagueController.deleteLeagueAdmins
)

module.exports = leagueRouter
