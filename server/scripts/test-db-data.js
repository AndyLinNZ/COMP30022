// InternalId is for internal use to conveniently replace
// with mongodb object ids when they become known
//
// the "id" field in each object gets populated when
// it is created

class InternalId {
    constructor(name) {
        this.name = name
        this.objId = undefined
    }
}

john = new InternalId('john')
jane = new InternalId('jane')
joshua = new InternalId('joshua')
const users = [
    {
        id: john,
        email: 'john.smith@example.com',
        firstName: 'John',
        lastName: 'Smith',
        password: 'S3cur3 P4ssw0rd 123!',
    },
    {
        id: jane,
        email: 'jane.doe@example.com',
        firstName: 'Jane',
        lastName: 'Doe',
        password: 'PassworD!!1!1',
    },
    {
        id: joshua,
        email: 'josh.d@example.com',
        firstName: 'Joshua',
        lastName: 'Dubar',
        password: 'Passwordddz',
    },
]

const johnLeague1 = new InternalId('john-league-1')
const johnLeague2 = new InternalId('john-league-2')
const leagues = [
    {
        id: johnLeague1,
        creator: john,
        admins: [john, jane],
        name: 'John Basketball League',
        organisation: 'John\'s Basketball',
    },
    {
        id: johnLeague2,
        creator: john,
        admins: [john],
        name: 'Smith\'s BBaller Association',
        organisation: 'John\'s Basketball',
    },
]

const johnSeason1 = new InternalId('john-season-1')
const seasons = [
    {
        id: johnSeason1,
        name: 'Summer 2021/2022',
        dateStart: Date.now(),
        dateFinish: Date.now() + 1000*86400*31,
        league: johnLeague1,
    },
]

const johnGrade1 = new InternalId('john-grade-1')
const grades = [
    {
        id: johnGrade1,
        name: 'U18 Mixed',
        difficulty: 'B',
        gender: 'mixed',
        season: johnSeason1,
    },
]

const johnTeam1 = new InternalId('john-team-1')
const janeTeam1 = new InternalId('jane-team-1')
const teams = [
    {
        id: johnTeam1,
        name: 'John\'s BBallers',
        admin: john,
        grades: [johnGrade1],
    },
    {
        id: janeTeam1,
        name: 'Jane\'s BBallers',
        admin: jane,
        grades: [johnGrade1],
    }
]

const johnsPlayer1 = new InternalId('johns-player-1')
const johnsPlayer2 = new InternalId('johns-player-2')
const johnsPlayer3 = new InternalId('johns-player-3')
const janesPlayer1 = new InternalId('janes-player-1')
const janesPlayer2 = new InternalId('janes-player-2')
const players = [
    {
        id: johnsPlayer1,
        name: 'John\'s First Player',
        team: johnTeam1,
    },
    {
        id: johnsPlayer2,
        name: 'John\'s Second Player',
        team: johnTeam1,
    },
    {
        id: johnsPlayer3,
        name: 'John\'s Third Player',
        team: johnTeam1,
    },
    {
        id: janesPlayer1,
        name: 'Jane\'s First Player',
        team: janeTeam1,
    },
    {
        id: janesPlayer2,
        name: 'Jane\'s Second Player',
        team: janeTeam1,
    },
]

const johnRound1 = new InternalId('john-round-1')
const johnRound2 = new InternalId('john-round-2')
const rounds = [
    {
        id: johnRound1,
        date: Date.now(),
        grade: johnGrade1,
    },
    {
        id: johnRound2,
        date: Date.now() + 1000*86400*7,
        grade: johnGrade1,
    }
]

const johnGame1 = new InternalId('john-game-1')
const games = [
    {
        id: johnGame1,
        dateStart: Date.now(),
        dateFinish: Date.now() + 1000*60,
        round: johnRound1,
        team1: {
            team: johnTeam1,
            playersStats: [
                {
                    playerId: johnsPlayer1,
                    points: 69,
                    assists: 5,
                    steals: 3,
                },
                {
                    playerId: johnsPlayer2,
                    points: 33,
                    assists: 6,
                    steals: 1,
                },
            ],
        },
        team2: {
            team: janeTeam1,
            playersStats: [
                {
                    playerId: janesPlayer1,
                    points: 55,
                    assists: 11,
                    steals: 6,
                },
                {
                    playerId: janesPlayer2,
                    points: 88,
                    assists: 0,
                    steals: 1,
                },
            ],
        },
        locationName: 'John\'s Basketball Arena',
        location: {
            type: 'Point',
            coordinates: [61.55, 77.77],
        },
    },
]

module.exports = {
    InternalId,
    users,
    leagues,
    seasons,
    grades,
    teams,
    players,
    rounds,
    games,
}
