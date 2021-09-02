const express = require('express')
const { getLeagueSeasonGradeTeam, ensureAuthenticated, ensureLeagueAdmin } = require('./utils')
const teamController = require('../controllers/teamController.js')

const teamRouter = express.Router()

// POST
teamRouter.post('/team', ensureAuthenticated, gradeController.createTeam)

module.exports = teamRouter
