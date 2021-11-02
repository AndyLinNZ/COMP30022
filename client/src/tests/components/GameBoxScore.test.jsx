import React from 'react'
import { render } from 'utils/test-utils'
import GameBoxScore from 'components/GameBoxScore'

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

describe('GameBoxScore', () => {
    test('renders correctly', () => {
        const { container } = render(<GameBoxScore game={stubGameData} />)

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="chakra-stack css-1twuvi0"
  >
    <div
      class="css-peekwf"
    >
      <div
        class="css-nkjao4"
      >
        <table
          class="chakra-table css-8h8zbs"
          role="table"
        >
          <thead
            class="css-0"
          >
            <tr
              class="css-148dcl3"
              role="row"
            >
              <th
                class="css-1yl8ql8"
              >
                PLAYER
              </th>
              <th
                class="css-1pxb4k9"
              >
                POINTS
              </th>
            </tr>
          </thead>
          <tbody
            class="css-tdnrhj"
          >
            <tr
              class="css-rh3m2f"
              role="row"
            >
              <td
                class="css-1eyncsv"
                role="gridcell"
              >
                Jane's First Player
              </td>
              <td
                class="css-1pn4oed"
                role="gridcell"
              >
                28
              </td>
            </tr>
            <tr
              class="css-rh3m2f"
              role="row"
            >
              <td
                class="css-1eyncsv"
                role="gridcell"
              >
                Jane's Second Player
              </td>
              <td
                class="css-1pn4oed"
                role="gridcell"
              >
                83
              </td>
            </tr>
            <tr
              class="css-csdx6d"
              role="row"
            >
              <td
                class="css-1eyncsv"
                role="gridcell"
              >
                TOTALS
              </td>
              <td
                class="css-1pn4oed"
                role="gridcell"
              >
                111
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="css-peekwf"
    >
      <div
        class="css-nkjao4"
      >
        <table
          class="chakra-table css-8h8zbs"
          role="table"
        >
          <thead
            class="css-0"
          >
            <tr
              class="css-148dcl3"
              role="row"
            >
              <th
                class="css-1yl8ql8"
              >
                PLAYER
              </th>
              <th
                class="css-1pxb4k9"
              >
                POINTS
              </th>
            </tr>
          </thead>
          <tbody
            class="css-tdnrhj"
          >
            <tr
              class="css-rh3m2f"
              role="row"
            >
              <td
                class="css-1eyncsv"
                role="gridcell"
              >
                Kangaroo Jumpy
              </td>
              <td
                class="css-1pn4oed"
                role="gridcell"
              >
                59
              </td>
            </tr>
            <tr
              class="css-rh3m2f"
              role="row"
            >
              <td
                class="css-1eyncsv"
                role="gridcell"
              >
                Kangaroo Kipper
              </td>
              <td
                class="css-1pn4oed"
                role="gridcell"
              >
                41
              </td>
            </tr>
            <tr
              class="css-csdx6d"
              role="row"
            >
              <td
                class="css-1eyncsv"
                role="gridcell"
              >
                TOTALS
              </td>
              <td
                class="css-1pn4oed"
                role="gridcell"
              >
                100
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
`)
    })
})
