const express = require('express')
const { ensureAuthenticated } = require('./utils')
const userController = require('../controllers/userController.js')

const userRouter = express.Router()

// GET
userRouter.get('/details', ensureAuthenticated, userController.getUserDetails)

// PATCH
userRouter.patch('/details', ensureAuthenticated, userController.updateUserDetails)

module.exports = userRouter
