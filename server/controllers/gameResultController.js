const GameResult = require('../models/gameResult')
const Game = require('../models/game')

async function createGameResult(req, res, next) {
    try {
        let { gameResultName, resultPoints, gameOutcome } = req.body
        const newGameResult = new GameResult({
            name: gameResultName,
            teamId: req.team._id,
            points: resultPoints,
            game: req.game._id,
            matchResult: gameOutcome
        })

        const gameResult = await newGameResult.save()

        // add the game result to the game's details
        var gameIntended = await Game.findOneAndUpdate(
            { _id: req.game._id },
            { $addToSet: {gameResults: newGameResult } },
            { new: true }
        )

        return res.status(201).json({
            success: true,
            data: gameIntended.gameResults,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = {
    createGameResult
}