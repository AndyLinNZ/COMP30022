const express = require('express')
const {
    getLeagueGradeSeason,
    ensureAuthenticated,
    ensureLeagueAdmin,
    getGameDocument
} = require('./utils')
const roundController = require('../controllers/roundController.js')

const roundRouter = express.Router()

// GET
roundRouter.get('/:roundId', getLeagueGradeSeason, roundController.getRound)

// POST
roundRouter.post(
    '/:roundId/game',
    ensureAuthenticated,
    ensureLeagueAdmin,
    roundController.createRoundGame
)

// PATCH
roundRouter.patch(
    '/:roundId/game/:gameId',
    ensureAuthenticated,
    ensureLeagueAdmin,
    getGameDocument,
    roundController.updateRoundGame
)

module.exports = roundRouter
