import React from 'react'
import { render } from 'utils/test-utils'
import GameContainer from 'components/GameContainer'

const stubGameData = {
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

const stubSeasonData = {
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

describe('GameContainer', () => {
    test('renders correctly', () => {
        const { container } = render(
            <GameContainer season={stubSeasonData} grade={stubGradeData} game={stubGameData} />
        )

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="css-ajse1l"
  >
    <div
      class="chakra-stack css-18jl4hx"
    >
      <div
        class="chakra-stack css-1d0c3h9"
      >
        <button
          class="chakra-button css-16xb6fl"
          type="button"
        >
          <span
            class="chakra-button__icon css-1wh2kri"
          >
            <svg
              aria-hidden="true"
              class="chakra-icon css-onkibi"
              focusable="false"
              viewBox="0 0 24 24"
            >
              <path
                d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                fill="currentColor"
              />
            </svg>
          </span>
          BACK
        </button>
        <p
          class="chakra-text css-zmaniy"
        >
          <a
            href="/leagues/616ca8930939fbed67c979c6/seasons/616ca8930939fbed67c979cd/grades"
            rel="noreferrer"
          >
            Summer 2021/2022
          </a>
        </p>
        <svg
          class="chakra-icon css-kvvn1j"
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path
            d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
            fill="currentColor"
          />
        </svg>
        <p
          class="chakra-text css-h6r5mc"
        >
          <a
            href="/leagues/616ca8930939fbed67c979c6/seasons/616ca8930939fbed67c979cd/grades/616ca8930939fbed67c979d0/rounds"
            rel="noreferrer"
          >
            U18 Mixed
          </a>
        </p>
      </div>
      <div
        align="center"
        class="css-0"
      >
        <div
          class="css-wvo25n"
        >
          <div
            class="css-gmuwbf"
          >
            COMPLETED
          </div>
        </div>
      </div>
      <hr
        align="top"
        aria-orientation="horizontal"
        class="chakra-divider css-sqhprt"
      />
      <div
        class="chakra-stack css-owjkmg"
      >
        <div
          class="css-1vbtcgd"
        >
          <p
            class="chakra-text css-13zz2ok"
          >
            Jane's BBallers
          </p>
          <p
            class="chakra-text css-13zz2ok"
          >
            Lygon Kangaroos
          </p>
        </div>
        <div
          class="css-1vbtcgd"
        >
          <p
            class="chakra-text css-1ow2drf"
          >
            111
          </p>
          <p
            class="chakra-text css-itq882"
          >
            100
          </p>
        </div>
      </div>
      <hr
        align="top"
        aria-orientation="horizontal"
        class="chakra-divider css-sqhprt"
      />
      <div
        class="css-1fug4av"
      >
        <div
          class="chakra-stack css-84zodg"
        >
          <svg
            class="chakra-icon css-pj1t66"
            focusable="false"
            viewBox="0 0 24 24"
          >
            <g
              fill="currentColor"
            >
              <path
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"
              />
              <path
                d="M17.134,15.81,12.5,11.561V6.5a1,1,0,0,0-2,0V12a1,1,0,0,0,.324.738l4.959,4.545a1.01,1.01,0,0,0,1.413-.061A1,1,0,0,0,17.134,15.81Z"
              />
            </g>
          </svg>
          <p
            class="chakra-text css-v0eyye"
          >
            9/23/2021, 10:49:50 PM
          </p>
        </div>
        <div
          class="chakra-stack css-84zodg"
        >
          <svg
            color="greyText.500"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0h24v24H0V0z"
              fill="none"
            />
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"
            />
            <circle
              cx="12"
              cy="9"
              r="2.5"
            />
          </svg>
          <p
            class="chakra-text css-v0eyye"
          >
            John's Basketball Arena
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
`)
    })
})
