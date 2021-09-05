const Player = require('../models/player')

async function createPlayer(req, res, next) {
    try {
        let { playerName } = req.body
        const newPlayer = new Player({
            name: playerName
        })

        const player = await newPlayer.save()

        return res.status(201).json({
            success: true,
            data: player,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = {
    createPlayer
}