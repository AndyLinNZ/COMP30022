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

gameRouter.patch(
    '/:gameId/details',
    ensureAuthenticated,
    ensureLeagueAdmin,
    gameController.updateGameDateLocation
)

module.exports = gameRouter
