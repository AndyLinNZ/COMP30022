const express = require('express')
const seasonController = require('../controllers/seasonController.js')

const seasonRouter = express.Router()

// GET
seasonRouter.get('/:seasonId', seasonController.getSeason)

module.exports = seasonRouter
