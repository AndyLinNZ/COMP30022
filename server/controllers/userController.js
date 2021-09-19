const { formatUserResp } = require('./responseFormatters')

async function getUserDetails(req, res, next) {
    try {
        var user = await req.user.execPopulate({
            path: 'teams',
            populate: {
                path: 'games',
                model: 'Game',
            },
        })

        user = await req.user.execPopulate({
            path: 'leagues',
            populate: {
                path: 'seasons',
                model: 'Season',
            },
        })

        return res.status(200).json({
            success: true,
            data: formatUserResp(user),
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = {
    getUserDetails,
}
