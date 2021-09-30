const express = require('express')
const {
    getLeagueGradeSeason,
    ensureAuthenticated,
    ensureLeagueAdmin,
    getTeamDocument,
    validateFixture
} = require('./utils')
const gradeController = require('../controllers/gradeController.js')

const gradeRouter = express.Router()

// GET
gradeRouter.get('/:gradeId', getLeagueGradeSeason, gradeController.getGrade)
gradeRouter.get('/:gradeId/team', getLeagueGradeSeason, gradeController.getAllGradeTeams)

// POST
gradeRouter.post(
    '/:gradeId/team',
    ensureAuthenticated,
    ensureLeagueAdmin,
    getTeamDocument,
    gradeController.addTeamToGrade
)
gradeRouter.post(
    '/:gradeId/round',
    ensureAuthenticated,
    ensureLeagueAdmin,
    gradeController.createRound
)
gradeRouter.post(
    '/:gradeId/fixture',
    ensureAuthenticated,
    validateFixture,
    gradeController.createFixture
)

// DELETE
gradeRouter.delete('/:gradeId', ensureAuthenticated, ensureLeagueAdmin, gradeController.deleteGrade)

module.exports = gradeRouter
