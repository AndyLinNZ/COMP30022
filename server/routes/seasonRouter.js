const express = require('express')
const { getLeagueGradeSeason, ensureAuthenticated, ensureLeagueAdmin } = require('./utils')
const seasonController = require('../controllers/seasonController.js')

const seasonRouter = express.Router()

// GET
seasonRouter.get('/:seasonId', getLeagueGradeSeason, seasonController.getSeason)
seasonRouter.get('/:seasonId/grade', getLeagueGradeSeason, seasonController.getAllSeasonGrades)

// POST
seasonRouter.post(
    '/:seasonId/grade',
    ensureAuthenticated,
    ensureLeagueAdmin,
    seasonController.createGrade
)

// UPDATE
seasonRouter.patch('/:seasonId', ensureAuthenticated, ensureLeagueAdmin, seasonController.updateSeason)

// DELETE
seasonRouter.delete('/:seasonId', ensureAuthenticated, ensureLeagueAdmin, seasonController.deleteSeason)

module.exports = seasonRouter
