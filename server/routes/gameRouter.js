const express = require('express')
const gameController = require('../controllers/gameController.js')
const { ensureAuthenticated, ensureLeagueAdmin } = require('./utils')

const gameRouter = express.Router()

// POST
gameRouter.post('/', ensureAuthenticated, ensureLeagueAdmin, gameController.createGame)

module.exports = gameRouter
