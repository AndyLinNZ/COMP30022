const express = require('express')
const { ensureAuthenticated } = require('./utils')
const userController = require('../controllers/userController.js')

const userRouter = express.Router()

// GET
userRouter.get('/details', ensureAuthenticated, userController.getUserDetails)

module.exports = userRouter
