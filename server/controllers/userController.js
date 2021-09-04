const { formatUserResp } = require('./responseFormatters')

async function getUserDetails(req, res, next) {
    await req.user.execPopulate('leagues')
    // await req.user.execPopulate('teams')

    return res.status(200).json({
        success: true,
        data: formatUserResp(req.user)
    })
}

module.exports = {
    getUserDetails
}
