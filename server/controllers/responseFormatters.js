const { pick } = require('./util')

const formatLeagueResp = (leagueDoc) =>
    pick(leagueDoc, ['name', 'organisation', 'creator', 'admins', 'seasons'])

const formatUserResp = (userDoc) => {
    var leagues = userDoc.leagues.map(formatLeagueResp)
    var details = pick(userDoc, ['email', 'firstName', 'lastName'])
    return { ...details, leagues }
}

module.exports = {
    formatLeagueResp,
    formatUserResp
}
