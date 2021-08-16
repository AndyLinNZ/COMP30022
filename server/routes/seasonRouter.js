const express = require('express')
const { ensureAuthenticated, ensureAdmin } = require('./utils')
const seasonController = require('../controllers/seasonController.js')

const seasonRouter = express.Router()

// GET
seasonRouter.get('/:seasonId', seasonController.getSeason)

// POST

// PATCH

module.exports = seasonRouter
