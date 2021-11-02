import React from 'react'
import { render } from 'utils/test-utils'
import MatchContainer from 'components/MatchContainer'

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

describe('MatchContainer', () => {
    test('renders correctly', () => {
        const { container } = render(<MatchContainer game={stubGameData} />)

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="css-1m4qy5h"
  >
    <div
      class="css-16vysr"
    >
      <div
        class="css-ys3583"
      >
        <p
          class="chakra-text css-16n2quf"
        >
          Jane's BBallers
        </p>
      </div>
      <div
        class="css-11cj219"
      >
        <p
          class="chakra-text css-1at3bww"
        >
          111
        </p>
      </div>
      <div
        class="css-2bw7u8"
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
      <div
        class="css-18mjmcj"
      >
        <p
          class="chakra-text css-16n2quf"
        >
          Lygon Kangaroos
        </p>
      </div>
      <div
        class="css-1apo5ro"
      >
        <p
          class="chakra-text css-1oz5t98"
        >
          100
        </p>
      </div>
      <div
        class="css-16w3wmk"
      >
        <hr
          aria-orientation="horizontal"
          class="chakra-divider css-14p7a2y"
        />
      </div>
      <div
        class="css-1gohen6"
      >
        <div
          class="chakra-stack css-13kyi4y"
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
              class="chakra-text css-0"
            >
              9/24/2021, 8:49:50 AM
            </p>
          </div>
          <div
            class="chakra-stack css-84zodg"
          >
            <svg
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
              class="chakra-text css-0"
            >
              John's Basketball Arena
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`)
    })
})
