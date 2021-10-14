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
gradeRouter.get('/:gradeId/round/:roundNum', getLeagueGradeSeason, gradeController.getRound)

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

// PATCH
gradeRouter.patch('/:gradeId', ensureAuthenticated, ensureLeagueAdmin, gradeController.updateGrade)

// DELETE
gradeRouter.delete('/:gradeId', ensureAuthenticated, ensureLeagueAdmin, gradeController.deleteGrade)

module.exports = gradeRouter
