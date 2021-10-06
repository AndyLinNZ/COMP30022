class TeamNode {
    // Make a Data structure for a team where they have teamId and adjacency list
    constructor(teamId) {
        this.teamId = teamId
        this.played = []
    }
    // Add team to played/adjacency list
    playTeam(teamNode) {
        const found = this.played.find((playedTeam) => playedTeam.team.teamId === teamNode.teamId)
        if (found) found.times += 1
        else this.played.push({ team: teamNode, times: 1 })
    }
    // Find how many games this team has played
    gamesPlayed() {
        return this.played
            .map((playedTeam) => playedTeam.times)
            .reduce((prev, curr) => prev + curr, 0)
    }
    // Private method to find next team to play from adjacency list based on least amount of times played
    #nextTeamFromPlayedTeams() {
        return [...this.played].sort((t1, t2) => t1.times - t2.times)[0].team
    }
    // Given an array of Teams, find any team from the Nodes list that this current Node hasen't played
    #teamsNotPlayed(teams) {
        return [...teams
            .filter((team) => !this.played
                .map((playedTeam) => playedTeam.team)
                .includes(team) && team != this)]
            .sort((t1, t2) => t1.gamesPlayed() - t2.gamesPlayed())
    }
    // Find the next team to play
    nextTeamToPlay(teams) {
        const newTeamsToPlay = this.#teamsNotPlayed(teams)
        if (newTeamsToPlay.length !== 0) return newTeamsToPlay[0]
        return this.#nextTeamFromPlayedTeams()
    }
}

// Returns the TeamNode thats played the least amount of games
function ejectNextTeamNode(teams) {
    return [...teams].sort((t1, t2) => t1.gamesPlayed() - t2.gamesPlayed())[0]
}

// Returns all teams that have not played a game
function teamDocsToGoOnBye(games, teams) {
    const played = games
        .map((game) => game.team1.team)
        .concat(games.map((game) => game.team2.team))
    return teams.filter((team) => !played.includes(team._id))
}

// Returns a date, location and locationName object.
// Also shifts ejected item to last in array
function ejectNextDateAndLocation(allDatesLocations, week) {
    const eject = allDatesLocations[0]
    const { dateStart, dateFinish } = eject
    var _dateStart = new Date(dateStart)
    _dateStart.setDate(_dateStart.getDate() + week * 7)
    var _dateFinish
    if (dateFinish) {
        _dateFinish = new Date(dateFinish)
        _dateFinish.setDate(_dateFinish.getDate() + week * 7)
    }
    allDatesLocations.push(allDatesLocations.shift())
    return { ...eject, dateStart: _dateStart.toISOString(), dateFinish: _dateFinish?.toISOString() }
}

module.exports = {
    TeamNode,
    ejectNextTeamNode,
    teamDocsToGoOnBye,
    ejectNextDateAndLocation,
}
