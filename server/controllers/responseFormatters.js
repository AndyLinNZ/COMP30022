const { pick } = require('./utils')

const formatLeagueResp = (leagueDoc) =>
    pick(leagueDoc, ['_id', 'name', 'organisation', 'creator', 'admins', 'seasons'])

const formatTeamResp = (teamDoc) =>
    pick(teamDoc, ['_id', 'name', 'totalWins', 'totalDraws', 'totalLosses', 'totalPoints', 'grades', 'players', 'gameResults'])

const formatUserResp = (userDoc) => {
    var leagues = userDoc.leagues.map(formatLeagueResp)
    var teams = userDoc.teams.map(formatTeamResp)
    var details = pick(userDoc, ['_id', 'email', 'firstName', 'lastName'])
    return { ...details, leagues, teams }
}

const formatOrderByStatus = () => {
    const sortingOrder = {
        'progress': 1,
        'upcoming': 2,
        'completed': 3
    }
    return (a, b) => {           
        const first = sortingOrder[a.status]
        const second = sortingOrder[b.status]

        let result = 0
        if (first < second) result = -1
        else if (first > second) result = 1
        // Compare by dates instead
        else { 
            result = a.dateStart < b.dateStart ? 1 : -1
            console.log(`Comparing ${a.dateStart} and ${b.dateStart}: ${result}`)
        }
        return result
    }
}


module.exports = {
    formatLeagueResp,
    formatTeamResp,
    formatUserResp,
    formatOrderByStatus
}
