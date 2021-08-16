const express = require('express')
const { ensureAuthenticated, ensureAdmin, ensureCreator } = require('./utils')
const leagueController = require('../controllers/leagueController.js')

const leagueRouter = express.Router()

// GET
leagueRouter.get('/', leagueController.getAllLeagues)
leagueRouter.get('/:leagueId', leagueController.getLeague)
leagueRouter.get('/:leagueId/season', leagueController.getAllLeagueSeasons)

// POST
leagueRouter.post('/', ensureAuthenticated, leagueController.createLeague)
leagueRouter.post(
    '/:leagueId/season',
    ensureAuthenticated,
    ensureAdmin,
    leagueController.createLeagueSeason
)
leagueRouter.post(
    '/:leagueId/admin',
    ensureAuthenticated,
    ensureCreator,
    leagueController.createLeagueAdmins
)

// DELETE
leagueRouter.delete(
    '/:leagueId/admin',
    ensureAuthenticated,
    ensureCreator,
    leagueController.deleteLeagueAdmins
)

module.exports = leagueRouter
