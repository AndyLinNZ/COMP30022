const express = require('express')
const gameResultController = require('../controllers/gameResultController.js')
const { ensureAuthenticated, ensureLeagueAdmin, getTeamDocument, getGameDocument } = require('./utils')

const gameResultRouter = express.Router()

// POST
gameResultRouter.post('/', ensureAuthenticated, ensureLeagueAdmin, getTeamDocument, getGameDocument, gameResultController.createGameResult)

module.exports = gameResultRouter