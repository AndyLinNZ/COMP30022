const Season = require('../models/season')

async function getSeason(req, res, next) {
    try {
        const season = await Season.findById(req.params.seasonId)
        if (!season) return next({ status: 404, message: 'Season does not exist' })

        return res.status(200).json({
            success: true,
            data: season,
        })
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = {
    getSeason,
}
