const express = require('express')
const {
    getLeagueGradeSeason,
    ensureAuthenticated,
    ensureLeagueAdmin
} = require('./utils')
const gameController = require('../controllers/gameController.js')

const gameRouter = express.Router()

// GET
gameRouter.get('/:gameId', getLeagueGradeSeason, gameController.getGame)

// PATCH
gameRouter.patch(
    '/:gameId/playerStats',
    ensureAuthenticated,
    ensureLeagueAdmin,
    gameController.updateGamePlayerStats
)

module.exports = gameRouter
