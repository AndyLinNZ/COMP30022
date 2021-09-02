const express = require('express')
const {
    getLeagueSeasonGradeTeam,
    ensureAuthenticated,
    ensureLeagueAdmin,
    ensureLeagueCreator,
} = require('./utils')
const leagueController = require('../controllers/leagueController.js')

const leagueRouter = express.Router()

// GET
leagueRouter.get('/', leagueController.getAllLeagues)
leagueRouter.get('/:leagueId', getLeagueSeasonGradeTeam, leagueController.getLeague)
leagueRouter.get(
    '/:leagueId/season',
    getLeagueSeasonGradeTeam,
    leagueController.getAllLeagueSeasons
)

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

// DELETE
leagueRouter.delete(
    '/:leagueId/admin',
    ensureAuthenticated,
    ensureLeagueCreator,
    leagueController.deleteLeagueAdmins
)

module.exports = leagueRouter
