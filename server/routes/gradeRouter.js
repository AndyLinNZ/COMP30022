const express = require('express')
const { ensureAuthenticated, ensureAdmin } = require('./utils')
const gradeController = require('../controllers/gradeController.js')

const gradeRouter = express.Router()

// GET
gradeRouter.get('/:gradeId/grade', gradeController.getAllGradeTeams)

// POST
gradeRouter.post('/:gradeId/team', ensureAuthenticated, ensureAdmin, gradeController.createTeam)

module.exports = gradeRouter
