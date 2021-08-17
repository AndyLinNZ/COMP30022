const express = require('express')
const { ensureAuthenticated, ensureAdmin } = require('./utils')
const seasonController = require('../controllers/seasonController.js')

const seasonRouter = express.Router()

// GET
seasonRouter.get('/:seasonId', seasonController.getSeason)
seasonRouter.get('/:seasonId/grade', seasonController.getAllSeasonGrades)

// POST
seasonRouter.post(
    '/:seasonId/grade',
    ensureAuthenticated,
    ensureAdmin,
    seasonController.createGrade
)

module.exports = seasonRouter
