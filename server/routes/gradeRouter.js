const express = require('express')
const { getLeagueSeasonGradeTeam, ensureAuthenticated, ensureLeagueAdmin } = require('./utils')
const gradeController = require('../controllers/gradeController.js')

const gradeRouter = express.Router()

// GET
gradeRouter.get('/:gradeId', getLeagueSeasonGradeTeam, gradeController.getGrade)
gradeRouter.get('/:gradeId/team', getLeagueSeasonGradeTeam, gradeController.getAllGradeTeams)

// POST
gradeRouter.post('/:gradeId/team', ensureAuthenticated, ensureLeagueAdmin, gradeController.addTeam)

module.exports = gradeRouter
