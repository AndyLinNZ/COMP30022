const express = require('express')
const router = express.Router()
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const leagueRouter = require('./leagueRouter')
const seasonRouter = require('./seasonRouter')
const gradeRouter = require('./gradeRouter')
const teamRouter = require('./teamRouter')
const playerRouter = require('./playerRouter')
const gameRouter = require('./gameRouter')

// routes
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/league', leagueRouter)
router.use('/season', seasonRouter)
router.use('/grade', gradeRouter)
router.use('/team', teamRouter)
router.use('/player', playerRouter)
router.use('/game', gameRouter)

// general error handling
router.use((err, req, res, _) => {
    res.status(err.status || 400).json({
        success: false,
        error: err.message || 'Invalid Request',
    })
})

module.exports = router
