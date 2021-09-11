const { pick } = require('./utils')

const formatLeagueResp = (leagueDoc) =>
    pick(leagueDoc, ['_id', 'name', 'organisation', 'creator', 'admins', 'seasons'])

const formatTeamResp = (teamDoc) =>
    pick(teamDoc, ['_id', 'name', 'totalWins', 'totalDraws', 'totalLosses', 'totalPoints', 'grades', 'players', 'games'])

const formatUserResp = (userDoc) => {
    var leagues = userDoc.leagues.map(formatLeagueResp)
    var teams = userDoc.teams.map(formatTeamResp)
    var details = pick(userDoc, ['_id', 'email', 'firstName', 'lastName'])
    return { ...details, leagues, teams }
}

module.exports = {
    formatLeagueResp,
    formatTeamResp,
    formatUserResp
}
