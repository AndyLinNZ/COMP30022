const { pick } = require('./utils')

const formatLeagueResp = (leagueDoc) => {
    const creator = pick(leagueDoc.creator, ['_id', 'email', 'firstName', 'lastName'])
    const league = pick(leagueDoc, ['_id', 'name', 'organisation', 'creator', 'admins', 'seasons'])
    return { ...league, creator }
}


const formatTeamResp = (teamDoc) =>
    pick(teamDoc, ['_id', 'name', 'totalWins', 'totalDraws', 'totalLosses', 'totalPoints', 'grades', 'players', 'games'])

const formatUserResp = (userDoc) => {
    const leagues = userDoc.leagues.map(formatLeagueResp)
    const teams = userDoc.teams.map(formatTeamResp)
    const details = formatUserDetailsResp(userDoc)
    return { ...details, leagues, teams }
}

const formatUserDetailsResp = (userDoc) => pick(userDoc, ['_id', 'email', 'firstName', 'lastName'])

const formatOrderByStatus = (doc) => {
    const sortingOrder = {
        'active': 1,
        'upcoming': 2,
        'completed': 3
    }
    return doc.sort((a, b) => {           
        const first = sortingOrder[a.status]
        const second = sortingOrder[b.status]

        let result = 0
        if (first < second) result = -1
        else if (first > second) result = 1
        // Compare by dates instead
        else result = a.dateStart < b.dateStart ? -1 : 1
        return result
    })
}

module.exports = {
    formatLeagueResp,
    formatTeamResp,
    formatUserResp,
    formatUserDetailsResp,
    formatOrderByStatus,
}
