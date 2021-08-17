const express = require('express')
const router = express.Router()
const authRouter = require('./authRouter')
const leagueRouter = require('./leagueRouter')
const seasonRouter = require('./seasonRouter')
const gradeRouter = require('./gradeRouter')

// routes
router.use('/auth', authRouter)
router.use('/league', leagueRouter)
router.use('/season', seasonRouter)
router.use('/grade', gradeRouter)

// general error handling
router.use((err, req, res, _) => {
    res.status(err.status || 400).json({
        success: false,
        error: err.message || 'Bad Request',
    })
})

module.exports = router
