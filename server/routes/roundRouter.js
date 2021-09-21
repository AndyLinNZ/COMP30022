const express = require('express')
const {
    getLeagueGradeSeason,
    ensureAuthenticated,
    ensureLeagueAdmin,
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
    roundController.createGame
)

// DELETE
roundRouter.delete(
    '/:roundId',
    ensureAuthenticated,
    ensureLeagueAdmin,
    roundController.deleteRound
)

module.exports = roundRouter
