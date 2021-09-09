const express = require('express')
const gameController = require('../controllers/gameController.js')
const playerStatsController = require('../controllers/playerStatsController.js')
const { ensureAuthenticated, ensureLeagueAdmin } = require('./utils')

const gameRouter = express.Router()

// POST
gameRouter.post('/', ensureAuthenticated, ensureLeagueAdmin, gameController.createGame)
gameRouter.post('/playerStat', ensureAuthenticated, ensureLeagueAdmin, playerStatsController.createPlayerStat)

// UPDATE
gameRouter.patch('/:gameId/gameInProgress', ensureAuthenticated, ensureLeagueAdmin, gameController.updateGameInProgress)
gameRouter.patch('/:gameId/completedGame', ensureAuthenticated, ensureLeagueAdmin, gameController.updateCompletedGame)

module.exports = gameRouter
