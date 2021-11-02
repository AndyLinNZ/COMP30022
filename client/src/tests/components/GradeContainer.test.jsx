import React from 'react'
import { render } from 'utils/test-utils'
import GradeContainer from 'components/GradeContainer'

const stubGradeData = {
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

describe('GradeContainer', () => {
    test('renders correctly', () => {
        const { container } = render(<GradeContainer grade={stubGradeData} />)

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="css-4vn8hv"
  >
    <div
      class="chakra-stack css-5inf9f"
    >
      <p
        class="chakra-text css-0"
      >
        U18 Mixed
      </p>
      <div
        class="chakra-stack css-84zodg"
      >
        <div
          class="css-44sw9n"
        >
          2 ROUND(S) ADDED
        </div>
        <div
          class="css-14oic7p"
        >
          6 TEAM(S) ASSIGNED
        </div>
      </div>
    </div>
  </div>
</div>
`)
    })
})
