export const stubGameData = {
    _id: '616ca8950939fbed67c97a46',
    round: '616ca8940939fbed67c97a0d',
    dateStart: '2021-09-23T22:49:50.844Z',
    dateFinish: '2021-09-23T22:50:50.844Z',
    location: {
        type: 'Point',
        coordinates: [61.55, 77.77],
    },
    locationName: "John's Basketball Arena",
    status: 'completed',
    paths: {
        leagueId: '616ca8930939fbed67c979c6',
        seasonId: '616ca8930939fbed67c979cd',
        gradeId: '616ca8930939fbed67c979d0',
    },
    team1: {
        team: {
            _id: '616ca8940939fbed67c979d4',
            name: "Jane's BBallers",
            players: [
                {
                    _id: '616ca8940939fbed67c979ee',
                    name: "Jane's First Player",
                },
                {
                    _id: '616ca8940939fbed67c979ef',
                    name: "Jane's Second Player",
                },
            ],
        },
        playersStats: [
            {
                _id: '616ca8940939fbed67c97a18',
                playerId: {
                    team: '616ca8940939fbed67c979d4',
                    _id: '616ca8940939fbed67c979ee',
                    name: "Jane's First Player",
                    __v: 0,
                    id: '616ca8940939fbed67c979ee',
                },
                points: 28,
                assists: 9,
                steals: 1,
                __v: 0,
                id: '616ca8940939fbed67c97a18',
            },
            {
                _id: '616ca8940939fbed67c97a19',
                playerId: {
                    team: '616ca8940939fbed67c979d4',
                    _id: '616ca8940939fbed67c979ef',
                    name: "Jane's Second Player",
                    __v: 0,
                    id: '616ca8940939fbed67c979ef',
                },
                points: 83,
                assists: 3,
                steals: 1,
                __v: 0,
                id: '616ca8940939fbed67c97a19',
            },
        ],
        totalPoints: 111,
    },
    team2: {
        team: {
            _id: '616ca8940939fbed67c979d5',
            name: 'Lygon Kangaroos',
            players: [
                {
                    _id: '616ca8940939fbed67c979f1',
                    name: 'Kangaroo Kipper',
                },
                {
                    _id: '616ca8940939fbed67c979f0',
                    name: 'Kangaroo Jumpy',
                },
            ],
        },
        playersStats: [
            {
                _id: '616ca8950939fbed67c97a30',
                playerId: {
                    team: '616ca8940939fbed67c979d5',
                    _id: '616ca8940939fbed67c979f0',
                    name: 'Kangaroo Jumpy',
                    __v: 0,
                    id: '616ca8940939fbed67c979f0',
                },
                points: 59,
                assists: 2,
                steals: 3,
                __v: 0,
                id: '616ca8950939fbed67c97a30',
            },
            {
                _id: '616ca8950939fbed67c97a31',
                playerId: {
                    team: '616ca8940939fbed67c979d5',
                    _id: '616ca8940939fbed67c979f1',
                    name: 'Kangaroo Kipper',
                    __v: 0,
                    id: '616ca8940939fbed67c979f1',
                },
                points: 41,
                assists: 1,
                steals: 3,
                __v: 0,
                id: '616ca8950939fbed67c97a31',
            },
        ],
        totalPoints: 100,
    },
}

export const stubSeasonData = {
    grades: ['616ca8930939fbed67c979d0'],
    _id: '616ca8930939fbed67c979cd',
    name: 'Summer 2021/2022',
    dateStart: '2021-09-16T22:49:50.844Z',
    dateFinish: '2021-11-15T22:49:50.844Z',
    league: '616ca8930939fbed67c979c6',
    __v: 0,
    status: 'active',
    id: '616ca8930939fbed67c979cd',
}

export const stubGradeData = {
    _id: '616ca8930939fbed67c979d0',
    name: 'U18 Mixed',
    difficulty: 'B',
    gender: 'mixed',
    season: '616ca8930939fbed67c979cd',
    ladder: [
        {
            team: {
                id: '616ca8940939fbed67c979d6',
                name: 'Brunswick Emus',
            },
            keyStats: {
                totalPoints: 6,
                wins: 2,
                draws: 0,
                losses: 0,
            },
            rank: 1,
        },
        {
            team: {
                id: '616ca8940939fbed67c979d4',
                name: "Jane's BBallers",
            },
            keyStats: {
                totalPoints: 6,
                wins: 2,
                draws: 0,
                losses: 0,
            },
            rank: 1,
        },
        {
            team: {
                id: '616ca8940939fbed67c979d5',
                name: 'Lygon Kangaroos',
            },
            keyStats: {
                totalPoints: 3,
                wins: 1,
                draws: 0,
                losses: 2,
            },
            rank: 2,
        },
        {
            team: {
                id: '616ca8940939fbed67c979d7',
                name: 'Swinburne Bulls',
            },
            keyStats: {
                totalPoints: 3,
                wins: 1,
                draws: 0,
                losses: 1,
            },
            rank: 2,
        },
        {
            team: {
                id: '616ca8940939fbed67c979d8',
                name: 'Bye Bye Team',
            },
            keyStats: {
                totalPoints: 0,
                wins: 0,
                draws: 0,
                losses: 0,
            },
            rank: 3,
        },
        {
            team: {
                id: '616ca8940939fbed67c979d3',
                name: "John's BBallers",
            },
            keyStats: {
                totalPoints: 0,
                wins: 0,
                draws: 0,
                losses: 3,
            },
            rank: 3,
        },
    ],
    teams: [
        {
            _id: '616ca8940939fbed67c979d8',
            name: 'Bye Bye Team',
        },
        {
            _id: '616ca8940939fbed67c979d6',
            name: 'Brunswick Emus',
        },
        {
            _id: '616ca8940939fbed67c979d5',
            name: 'Lygon Kangaroos',
        },
        {
            _id: '616ca8940939fbed67c979d7',
            name: 'Swinburne Bulls',
        },
        {
            _id: '616ca8940939fbed67c979d4',
            name: "Jane's BBallers",
        },
        {
            _id: '616ca8940939fbed67c979d3',
            name: "John's BBallers",
        },
    ],
    fixture: [
        {
            _id: '616ca8940939fbed67c97a0d',
            grade: '616ca8930939fbed67c979d0',
            games: [
                {
                    _id: '616ca8950939fbed67c97a46',
                    dateStart: '2021-09-23T22:49:50.844Z',
                    dateFinish: '2021-09-23T22:50:50.844Z',
                    location: {
                        type: 'Point',
                        coordinates: [61.55, 77.77],
                    },
                    locationName: "John's Basketball Arena",
                    round: '616ca8940939fbed67c97a0d',
                    status: 'completed',
                    team1: {
                        team: {
                            _id: '616ca8940939fbed67c979d4',
                            name: "Jane's BBallers",
                        },
                        totalPoints: 111,
                    },
                    team2: {
                        team: {
                            _id: '616ca8940939fbed67c979d5',
                            name: 'Lygon Kangaroos',
                        },
                        totalPoints: 100,
                    },
                },
                {
                    _id: '616ca8950939fbed67c97a48',
                    dateStart: '2021-09-26T22:49:50.844Z',
                    dateFinish: '2021-09-26T22:50:50.844Z',
                    location: {
                        type: 'Point',
                        coordinates: [61.55, 77.77],
                    },
                    locationName: "John's Basketball Arena",
                    round: '616ca8940939fbed67c97a0d',
                    status: 'completed',
                    team1: {
                        team: {
                            _id: '616ca8940939fbed67c979d6',
                            name: 'Brunswick Emus',
                        },
                        totalPoints: 121,
                    },
                    team2: {
                        team: {
                            _id: '616ca8940939fbed67c979d7',
                            name: 'Swinburne Bulls',
                        },
                        totalPoints: 120,
                    },
                },
                {
                    _id: '616ca8950939fbed67c97a50',
                    dateStart: '2021-09-28T22:49:50.844Z',
                    dateFinish: '2021-09-28T22:50:50.844Z',
                    location: {
                        type: 'Point',
                        coordinates: [61.55, 77.77],
                    },
                    locationName: "John's Basketball Arena",
                    round: '616ca8940939fbed67c97a0d',
                    status: 'completed',
                    team1: {
                        team: {
                            _id: '616ca8940939fbed67c979d3',
                            name: "John's BBallers",
                        },
                        totalPoints: 95,
                    },
                    team2: {
                        team: {
                            _id: '616ca8940939fbed67c979d5',
                            name: 'Lygon Kangaroos',
                        },
                        totalPoints: 100,
                    },
                },
            ],
            teamsOnBye: [
                {
                    _id: '616ca8940939fbed67c979d8',
                    name: 'Bye Bye Team',
                },
            ],
        },
        {
            _id: '616ca8940939fbed67c97a0c',
            grade: '616ca8930939fbed67c979d0',
            games: [
                {
                    _id: '616ca8950939fbed67c97a4c',
                    dateStart: '2021-09-16T22:49:50.844Z',
                    dateFinish: '2021-09-16T22:50:50.844Z',
                    location: {
                        type: 'Point',
                        coordinates: [61.55, 77.77],
                    },
                    locationName: "John's Basketball Arena",
                    round: '616ca8940939fbed67c97a0c',
                    status: 'completed',
                    team1: {
                        team: {
                            _id: '616ca8940939fbed67c979d3',
                            name: "John's BBallers",
                        },
                        totalPoints: 102,
                    },
                    team2: {
                        team: {
                            _id: '616ca8940939fbed67c979d4',
                            name: "Jane's BBallers",
                        },
                        totalPoints: 143,
                    },
                },
                {
                    _id: '616ca8950939fbed67c97a4a',
                    dateStart: '2021-09-19T22:49:50.844Z',
                    dateFinish: '2021-09-19T22:50:50.844Z',
                    location: {
                        type: 'Point',
                        coordinates: [61.55, 77.77],
                    },
                    locationName: "John's Basketball Arena",
                    round: '616ca8940939fbed67c97a0c',
                    status: 'completed',
                    team1: {
                        team: {
                            _id: '616ca8940939fbed67c979d5',
                            name: 'Lygon Kangaroos',
                        },
                        totalPoints: 120,
                    },
                    team2: {
                        team: {
                            _id: '616ca8940939fbed67c979d6',
                            name: 'Brunswick Emus',
                        },
                        totalPoints: 134,
                    },
                },
                {
                    _id: '616ca8950939fbed67c97a44',
                    dateStart: '2021-09-21T22:49:50.844Z',
                    dateFinish: '2021-09-21T22:50:50.844Z',
                    location: {
                        type: 'Point',
                        coordinates: [61.55, 77.77],
                    },
                    locationName: "John's Basketball Arena",
                    round: '616ca8940939fbed67c97a0c',
                    status: 'completed',
                    team1: {
                        team: {
                            _id: '616ca8940939fbed67c979d7',
                            name: 'Swinburne Bulls',
                        },
                        totalPoints: 121,
                    },
                    team2: {
                        team: {
                            _id: '616ca8940939fbed67c979d3',
                            name: "John's BBallers",
                        },
                        totalPoints: 91,
                    },
                },
            ],
            teamsOnBye: [
                {
                    _id: '616ca8940939fbed67c979d8',
                    name: 'Bye Bye Team',
                },
            ],
        },
    ],
}

export const stubLadderData = [
    {
        team: {
            id: '616ca8940939fbed67c979d6',
            name: 'Brunswick Emus',
        },
        keyStats: {
            totalPoints: 6,
            wins: 2,
            draws: 0,
            losses: 0,
        },
        rank: 1,
    },
    {
        team: {
            id: '616ca8940939fbed67c979d4',
            name: "Jane's BBallers",
        },
        keyStats: {
            totalPoints: 6,
            wins: 2,
            draws: 0,
            losses: 0,
        },
        rank: 1,
    },
    {
        team: {
            id: '616ca8940939fbed67c979d5',
            name: 'Lygon Kangaroos',
        },
        keyStats: {
            totalPoints: 3,
            wins: 1,
            draws: 0,
            losses: 2,
        },
        rank: 2,
    },
    {
        team: {
            id: '616ca8940939fbed67c979d7',
            name: 'Swinburne Bulls',
        },
        keyStats: {
            totalPoints: 3,
            wins: 1,
            draws: 0,
            losses: 1,
        },
        rank: 2,
    },
    {
        team: {
            id: '616ca8940939fbed67c979d8',
            name: 'Bye Bye Team',
        },
        keyStats: {
            totalPoints: 0,
            wins: 0,
            draws: 0,
            losses: 0,
        },
        rank: 3,
    },
    {
        team: {
            id: '616ca8940939fbed67c979d3',
            name: "John's BBallers",
        },
        keyStats: {
            totalPoints: 0,
            wins: 0,
            draws: 0,
            losses: 3,
        },
        rank: 3,
    },
]

export const stubRoundData = [
    {
        _id: '616ca8940939fbed67c97a0d',
        grade: '616ca8930939fbed67c979d0',
        games: [
            {
                _id: '616ca8950939fbed67c97a46',
                dateStart: '2021-09-23T22:49:50.844Z',
                dateFinish: '2021-09-23T22:50:50.844Z',
                location: {
                    type: 'Point',
                    coordinates: [61.55, 77.77],
                },
                locationName: "John's Basketball Arena",
                round: '616ca8940939fbed67c97a0d',
                status: 'completed',
                team1: {
                    team: {
                        _id: '616ca8940939fbed67c979d4',
                        name: "Jane's BBallers",
                    },
                    totalPoints: 111,
                },
                team2: {
                    team: {
                        _id: '616ca8940939fbed67c979d5',
                        name: 'Lygon Kangaroos',
                    },
                    totalPoints: 100,
                },
            },
            {
                _id: '616ca8950939fbed67c97a48',
                dateStart: '2021-09-26T22:49:50.844Z',
                dateFinish: '2021-09-26T22:50:50.844Z',
                location: {
                    type: 'Point',
                    coordinates: [61.55, 77.77],
                },
                locationName: "John's Basketball Arena",
                round: '616ca8940939fbed67c97a0d',
                status: 'completed',
                team1: {
                    team: {
                        _id: '616ca8940939fbed67c979d6',
                        name: 'Brunswick Emus',
                    },
                    totalPoints: 121,
                },
                team2: {
                    team: {
                        _id: '616ca8940939fbed67c979d7',
                        name: 'Swinburne Bulls',
                    },
                    totalPoints: 120,
                },
            },
            {
                _id: '616ca8950939fbed67c97a50',
                dateStart: '2021-09-28T22:49:50.844Z',
                dateFinish: '2021-09-28T22:50:50.844Z',
                location: {
                    type: 'Point',
                    coordinates: [61.55, 77.77],
                },
                locationName: "John's Basketball Arena",
                round: '616ca8940939fbed67c97a0d',
                status: 'completed',
                team1: {
                    team: {
                        _id: '616ca8940939fbed67c979d3',
                        name: "John's BBallers",
                    },
                    totalPoints: 95,
                },
                team2: {
                    team: {
                        _id: '616ca8940939fbed67c979d5',
                        name: 'Lygon Kangaroos',
                    },
                    totalPoints: 100,
                },
            },
        ],
        teamsOnBye: [
            {
                _id: '616ca8940939fbed67c979d8',
                name: 'Bye Bye Team',
            },
        ],
    },
    {
        _id: '616ca8940939fbed67c97a0c',
        grade: '616ca8930939fbed67c979d0',
        games: [
            {
                _id: '616ca8950939fbed67c97a4c',
                dateStart: '2021-09-16T22:49:50.844Z',
                dateFinish: '2021-09-16T22:50:50.844Z',
                location: {
                    type: 'Point',
                    coordinates: [61.55, 77.77],
                },
                locationName: "John's Basketball Arena",
                round: '616ca8940939fbed67c97a0c',
                status: 'completed',
                team1: {
                    team: {
                        _id: '616ca8940939fbed67c979d3',
                        name: "John's BBallers",
                    },
                    totalPoints: 102,
                },
                team2: {
                    team: {
                        _id: '616ca8940939fbed67c979d4',
                        name: "Jane's BBallers",
                    },
                    totalPoints: 143,
                },
            },
            {
                _id: '616ca8950939fbed67c97a4a',
                dateStart: '2021-09-19T22:49:50.844Z',
                dateFinish: '2021-09-19T22:50:50.844Z',
                location: {
                    type: 'Point',
                    coordinates: [61.55, 77.77],
                },
                locationName: "John's Basketball Arena",
                round: '616ca8940939fbed67c97a0c',
                status: 'completed',
                team1: {
                    team: {
                        _id: '616ca8940939fbed67c979d5',
                        name: 'Lygon Kangaroos',
                    },
                    totalPoints: 120,
                },
                team2: {
                    team: {
                        _id: '616ca8940939fbed67c979d6',
                        name: 'Brunswick Emus',
                    },
                    totalPoints: 134,
                },
            },
            {
                _id: '616ca8950939fbed67c97a44',
                dateStart: '2021-09-21T22:49:50.844Z',
                dateFinish: '2021-09-21T22:50:50.844Z',
                location: {
                    type: 'Point',
                    coordinates: [61.55, 77.77],
                },
                locationName: "John's Basketball Arena",
                round: '616ca8940939fbed67c97a0c',
                status: 'completed',
                team1: {
                    team: {
                        _id: '616ca8940939fbed67c979d7',
                        name: 'Swinburne Bulls',
                    },
                    totalPoints: 121,
                },
                team2: {
                    team: {
                        _id: '616ca8940939fbed67c979d3',
                        name: "John's BBallers",
                    },
                    totalPoints: 91,
                },
            },
        ],
        teamsOnBye: [
            {
                _id: '616ca8940939fbed67c979d8',
                name: 'Bye Bye Team',
            },
        ],
    },
]
