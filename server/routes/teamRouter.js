const express = require('express')
const { getTeamDocument, ensureAuthenticated, ensureTeamAdmin } = require('./utils')
const teamController = require('../controllers/teamController.js')

const teamRouter = express.Router()

// GET
teamRouter.get('/:teamId', getTeamDocument, teamController.getTeam)

// POST
teamRouter.post('/', ensureAuthenticated, teamController.createTeam)

// UPDATE
teamRouter.patch('/:teamId', ensureTeamAdmin, teamController.updateTeam)

module.exports = teamRouter