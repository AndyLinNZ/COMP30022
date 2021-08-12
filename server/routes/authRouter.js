const express = require('express')
const authController = require('../controllers/authController.js')

const authRouter = express.Router()

// POST
authRouter.post('/register', authController.registerUser)
authRouter.post('/login', authController.loginUser)

module.exports = authRouter
