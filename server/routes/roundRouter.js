const express = require('express')
const {
    ensureAuthenticated,
    ensureLeagueAdmin,
} = require('./utils')
const roundController = require('../controllers/roundController.js')

const roundRouter = express.Router()

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
