const express = require('express')
const router = express.Router()
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const leagueRouter = require('./leagueRouter')
const seasonRouter = require('./seasonRouter')
const gradeRouter = require('./gradeRouter')
const roundRouter = require('./roundRouter')
const teamRouter = require('./teamRouter')

// routes
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/league', leagueRouter)
router.use('/season', seasonRouter)
router.use('/grade', gradeRouter)
router.use('/round', roundRouter)
router.use('/team', teamRouter)

// general error handling
router.use((err, req, res, _) => {
    res.status(err.status || 400).json({
        success: false,
        error: err.message || 'Invalid Request',
    })
})

module.exports = router
