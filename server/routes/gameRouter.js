const express = require('express')
const {
    getLeagueGradeSeason,
    ensureAuthenticated,
    ensureLeagueAdmin,
    getGameDocument
} = require('./utils')
const gameController = require('../controllers/gameController.js')

const gameRouter = express.Router()

// GET
gameRouter.get('/:gameId', getLeagueGradeSeason, getGameDocument, gameController.getGame)

// PATCH
gameRouter.patch(
    '//:gameId',
    ensureAuthenticated,
    ensureLeagueAdmin,
    getGameDocument,
    gameController.getGame
)

module.exports = gameRouter
