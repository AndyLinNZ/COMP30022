const Game = require('../models/game')

async function createGame(req, res, next) {
    try {
        let { start, finish, venue_name, venue_coord } = req.body
        const newGame = new Game({
            dateStart: start,
            dateFinished: finish,
            location:  {
                type: venue_name,
                coordinates: venue_coord
            }
        })

        const game = await newGame.save()

        return res.status(201).json({
            success: true,
            data: game,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = {
    createGame
}