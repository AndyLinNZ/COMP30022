const express = require('express')
const { getLeagueSeasonGradeTeam, ensureAuthenticated, ensureLeagueAdmin } = require('./utils')
const seasonController = require('../controllers/seasonController.js')

const seasonRouter = express.Router()

// GET
seasonRouter.get('/:seasonId', getLeagueSeasonGradeTeam, seasonController.getSeason)
seasonRouter.get('/:seasonId/grade', getLeagueSeasonGradeTeam, seasonController.getAllSeasonGrades)

// POST
seasonRouter.post(
    '/:seasonId/grade',
    ensureAuthenticated,
    ensureLeagueAdmin,
    seasonController.createGrade
)

module.exports = seasonRouter
