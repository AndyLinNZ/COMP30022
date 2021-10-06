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
const lygonKangaroos = new InternalId('lygon-kangaroos')
const brunswickEmus = new InternalId('brunswick-emus')
const swinburneBulls = new InternalId('swinburne-bulls')
const byebyeTeam = new InternalId('bye-bye-team')
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
    },
    {
        id: lygonKangaroos,
        name: 'Lygon Kangaroos',
        admin: john,
        grades: [johnGrade1],
    },
    {
        id: brunswickEmus,
        name: 'Brunswick Emus',
        admin: john,
        grades: [johnGrade1],
    },
    {
        id: swinburneBulls,
        name: 'Swinburne Bulls',
        admin: john,
        grades: [johnGrade1],
    },
    {
        id: byebyeTeam,
        name: 'Bye Bye Team',
        admin: john,
        grades: [johnGrade1],
    },
]

const johnsPlayer1 = new InternalId('johns-player-1')
const johnsPlayer2 = new InternalId('johns-player-2')
const johnsPlayer3 = new InternalId('johns-player-3')
const janesPlayer1 = new InternalId('janes-player-1')
const janesPlayer2 = new InternalId('janes-player-2')
const lygonKangaroosPlayer1 = new InternalId('lygon-kangaroos-player-1')
const lygonKangaroosPlayer2 = new InternalId('lygon-kangaroos-player-2')
const brunswickEmusPlayer1 = new InternalId('brunswick-emus-player-1')
const brunswickEmusPlayer2 = new InternalId('brunswick-emus-player-2')
const swinburneBullsPlayer1 = new InternalId('swinburne-bulls-player-1')
const swinburneBullsPlayer2 = new InternalId('swinburne-bulls-player-2')
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
    {
        id: lygonKangaroosPlayer1,
        name: 'Kangaroo Jumpy',
        team: lygonKangaroos,
    },
    {
        id: lygonKangaroosPlayer2,
        name: 'Kangaroo Kipper',
        team: lygonKangaroos,
    },
    {
        id: brunswickEmusPlayer1,
        name: 'Emu Emma',
        team: brunswickEmus,
    },
    {
        id: brunswickEmusPlayer2,
        name: 'Emu Eddie',
        team: brunswickEmus,
    },
    {
        id: swinburneBullsPlayer1,
        name: 'Bull Bill',
        team: swinburneBulls,
    },
    {
        id: swinburneBullsPlayer2,
        name: 'Bull Barry',
        team: swinburneBulls,
    },
]

const johnRound1 = new InternalId('john-round-1')
const johnRound2 = new InternalId('john-round-2')
const rounds = [
    {
        id: johnRound1,
        grade: johnGrade1,
        teamsOnBye: [byebyeTeam],
    },
    {
        id: johnRound2,
        grade: johnGrade1,
        teamsOnBye: [byebyeTeam],
    }
]

const johnGame1 = new InternalId('john-game-1')
const johnGame2 = new InternalId('john-game-2')
const johnGame3 = new InternalId('john-game-3')
const johnGame4 = new InternalId('john-game-4')
const johnGame5 = new InternalId('john-game-5')
const johnGame6 = new InternalId('john-game-6')
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
    {
        id: johnGame2,
        dateStart: Date.now() + 1000*86400*3,
        dateFinish: Date.now() + 1000*86400*3 + 1000*60,
        round: johnRound1,
        team1: {
            team: lygonKangaroos,
            playersStats: [
                {
                    playerId: lygonKangaroosPlayer1,
                    points: 65,
                    assists: 3,
                    steals: 8,
                },
                {
                    playerId: lygonKangaroosPlayer2,
                    points: 55,
                    assists: 3,
                    steals: 2,
                },
            ],
        },
        team2: {
            team: brunswickEmus,
            playersStats: [
                {
                    playerId: brunswickEmusPlayer1,
                    points: 45,
                    assists: 11,
                    steals: 5,
                },
                {
                    playerId: brunswickEmusPlayer2,
                    points: 89,
                    assists: 3,
                    steals: 2,
                },
            ],
        },
        locationName: 'John\'s Basketball Arena',
        location: {
            type: 'Point',
            coordinates: [61.55, 77.77],
        },
    },
    {
        id: johnGame3,
        dateStart: Date.now() + 1000*86400*5,
        dateFinish: Date.now() + 1000*86400*5 + 1000*60,
        round: johnRound1,
        team1: {
            team: swinburneBulls,
            playersStats: [
                {
                    playerId: swinburneBullsPlayer1,
                    points: 68,
                    assists: 9,
                    steals: 1,
                },
                {
                    playerId: swinburneBullsPlayer2,
                    points: 53,
                    assists: 4,
                    steals: 1,
                },
            ],
        },
        team2: {
            team: johnTeam1,
            playersStats: [
                {
                    playerId: johnsPlayer1,
                    points: 49,
                    assists: 3,
                    steals: 3,
                },
                {
                    playerId: johnsPlayer2,
                    points: 31,
                    assists: 1,
                    steals: 2,
                },
                {
                    playerId: johnsPlayer3,
                    points: 11,
                    assists: 1,
                    steals: 2,
                },
            ],
        },
        locationName: 'John\'s Basketball Arena',
        location: {
            type: 'Point',
            coordinates: [61.55, 77.77],
        },
    },
    {
        id: johnGame4,
        dateStart: Date.now() + 1000*86400*7,
        dateFinish: Date.now() + 1000*86400*7 + 1000*60,
        round: johnRound2,
        team1: {
            team: janeTeam1,
            playersStats: [
                {
                    playerId: janesPlayer1,
                    points: 28,
                    assists: 9,
                    steals: 1,
                },
                {
                    playerId: janesPlayer2,
                    points: 83,
                    assists: 3,
                    steals: 1,
                },
            ],
        },
        team2: {
            team: lygonKangaroos,
            playersStats: [
                {
                    playerId: lygonKangaroosPlayer1,
                    points: 59,
                    assists: 2,
                    steals: 3,
                },
                {
                    playerId: lygonKangaroosPlayer2,
                    points: 41,
                    assists: 1,
                    steals: 3,
                },
            ],
        },
        locationName: 'John\'s Basketball Arena',
        location: {
            type: 'Point',
            coordinates: [61.55, 77.77],
        },
    },
    {
        id: johnGame5,
        dateStart: Date.now() + 1000*86400*(7+3),
        dateFinish: Date.now() + 1000*86400*(7+3) + 1000*60,
        round: johnRound2,
        team1: {
            team: brunswickEmus,
            playersStats: [
                {
                    playerId: brunswickEmusPlayer1,
                    points: 58,
                    assists: 3,
                    steals: 4,
                },
                {
                    playerId: brunswickEmusPlayer2,
                    points: 63,
                    assists: 1,
                    steals: 3,
                },
            ],
        },
        team2: {
            team: swinburneBulls,
            playersStats: [
                {
                    playerId: swinburneBullsPlayer1,
                    points: 69,
                    assists: 2,
                    steals: 1,
                },
                {
                    playerId: swinburneBullsPlayer2,
                    points: 51,
                    assists: 1,
                    steals: 2,
                },
            ],
        },
        locationName: 'John\'s Basketball Arena',
        location: {
            type: 'Point',
            coordinates: [61.55, 77.77],
        },
    },
    {
        id: johnGame6,
        dateStart: Date.now() + 1000*86400*(7+5),
        dateFinish: Date.now() + 1000*86400*(7+5) + 1000*60,
        round: johnRound2,
        team1: {
            team: johnTeam1,
            playersStats: [
                {
                    playerId: johnsPlayer1,
                    points: 52,
                    assists: 2,
                    steals: 1,
                },
                {
                    playerId: johnsPlayer2,
                    points: 43,
                    assists: 2,
                    steals: 5,
                },
            ],
        },
        team2: {
            team: lygonKangaroos,
            playersStats: [
                {
                    playerId: lygonKangaroosPlayer1,
                    points: 39,
                    assists: 2,
                    steals: 4,
                },
                {
                    playerId: lygonKangaroosPlayer2,
                    points: 61,
                    assists: 1,
                    steals: 2,
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
