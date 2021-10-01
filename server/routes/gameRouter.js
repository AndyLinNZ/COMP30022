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
    '/:gameId',
    ensureAuthenticated,
    ensureLeagueAdmin,
    gameController.updateGame
)

gameRouter.patch(
    '/:gameId/details',
    ensureAuthenticated,
    ensureLeagueAdmin,
    gameController.updateGameDateLocation
)

module.exports = gameRouter
