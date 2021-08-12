const express = require('express')
const router = express.Router()
const leagueRouter = require('./leagueRouter')
const seasonRouter = require('./seasonRouter')
const userController = require('../controllers/userController')

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)

// general error handling
router.use((err, req, res, _) => {
    res.status(err.status || 400).json({
        success: false,
        error: err.message || 'Bad Request',
    })
})

// routes
router.use('/league', leagueRouter)
router.use('/season', seasonRouter)

module.exports = router
