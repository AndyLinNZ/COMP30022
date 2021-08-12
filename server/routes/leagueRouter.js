const express = require('express')
const leagueController = require('../controllers/leagueController.js')

const leagueRouter = express.Router()

// GET
leagueRouter.get('/', leagueController.getAllLeagues)
leagueRouter.get('/:leagueId', leagueController.getLeague)
leagueRouter.get('/:leagueId/season', leagueController.getAllLeagueSeasons)

// POST
leagueRouter.post('/', leagueController.createLeague)
leagueRouter.post('/:leagueId/season', leagueController.createLeagueSeason)

// PATCH
leagueRouter.patch('/:leagueId/admin/', leagueController.addLeagueAdmin)

module.exports = leagueRouter
