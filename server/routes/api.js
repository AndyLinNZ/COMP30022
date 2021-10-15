const express = require('express')
const router = express.Router()

// routes
router.use('/auth', require('./authRouter'))
router.use('/user', require('./userRouter'))
router.use('/league', require('./leagueRouter'))
router.use('/season', require('./seasonRouter'))
router.use('/grade', require('./gradeRouter'))
router.use('/round', require('./roundRouter'))
router.use('/game', require('./gameRouter'))
router.use('/team', require('./teamRouter'))

// general error handling
router.use((err, req, res, _) => {
    if (err?.code === 11000) {
        err.message = 'Input pairing not unique.'
    }
    res.status(err.status || 400).json({
        success: false,
        error: err.message || 'Invalid Request',
    })
})

module.exports = router
