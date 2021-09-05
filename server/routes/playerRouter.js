const express = require('express')
const playerController = require('../controllers/playerController.js')
const { ensureAuthenticated } = require('./utils')

const playerRouter = express.Router()

// POST
playerRouter.post('/', ensureAuthenticated, playerController.createPlayer)

module.exports = playerRouter
