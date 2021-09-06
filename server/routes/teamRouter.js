const express = require('express')
const { getTeamDocument, ensureAuthenticated, ensureTeamAdmin } = require('./utils')
const teamController = require('../controllers/teamController.js')

const teamRouter = express.Router()

// GET
teamRouter.get('/:teamId', getTeamDocument, teamController.getTeam)

// POST
teamRouter.post('/', ensureAuthenticated, teamController.createTeam)
teamRouter.post('/:teamId/player', ensureAuthenticated, ensureTeamAdmin, teamController.addPlayerToTeam)
teamRouter.post('/:teamId/gameResult', teamController.addGameResultToTeam)

// UPDATE
teamRouter.patch('/:teamId', ensureTeamAdmin, teamController.updateTeam)

// DELETE
teamRouter.delete('/:teamId/player', ensureAuthenticated, ensureTeamAdmin, teamController.deletePlayersFromTeam)

module.exports = teamRouter
