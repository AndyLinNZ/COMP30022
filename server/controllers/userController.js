const { formatUserResp } = require('./responseFormatters')

async function getUserDetails(req, res, next) {
    var user = await req.user.execPopulate('leagues')
    user = await req.user.execPopulate({
        path: 'teams',
        populate: {
            path: 'games',
            model: 'Game',
        },
    })

    return res.status(200).json({
        success: true,
        data: formatUserResp(user)
    })
}

module.exports = {
    getUserDetails
}
