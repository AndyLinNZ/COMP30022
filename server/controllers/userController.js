const { formatUserResp } = require('./responseFormatters')

async function getUserDetails(req, res, next) {
    const user = await req.user.execPopulate('leagues')

    return res.status(200).json({
        success: true,
        data: formatUserResp(user)
    })
}

module.exports = {
    getUserDetails
}
