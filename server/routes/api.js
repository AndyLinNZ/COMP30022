const express = require('express')
const router = express.Router()
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const leagueRouter = require('./leagueRouter')
const seasonRouter = require('./seasonRouter')
const gradeRouter = require('./gradeRouter')
const roundRouter = require('./roundRouter')
const gameRouter = require('./gameRouter')
const teamRouter = require('./teamRouter')

// routes
router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/league', leagueRouter)
router.use('/season', seasonRouter)
router.use('/grade', gradeRouter)
router.use('/round', roundRouter)
router.use('/game', gameRouter)
router.use('/team', teamRouter)

// general error handling
router.use((err, req, res, _) => {
    if (err?.code === 11000) {
        const constraints = Object.keys(err.keyPattern).reduce((key1, key2) => `${key1}, ${key2}`)
        err.message = `${constraints} input pairing not unique.`
    }
    res.status(err.status || 400).json({
        success: false,
        error: err.message || 'Invalid Request',
    })
})

module.exports = router
