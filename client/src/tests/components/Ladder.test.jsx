import React from 'react'
import { render } from 'utils/test-utils'
import Ladder from 'components/Ladder'

const stubLadderData = [
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

describe('Ladder', () => {
    test('renders correctly', () => {
        const { container } = render(<Ladder ladder={stubLadderData} />)

        expect(container).toMatchInlineSnapshot(`
<div>
  <table
    class="chakra-table css-1e7tb7d"
    role="table"
  >
    <thead
      class="css-0"
    >
      <tr
        class="css-xyn851"
        role="row"
      >
        <th
          class="css-xhl574"
        >
          #
        </th>
        <th
          class="css-xhl574"
        >
          TEAM
        </th>
        <th
          class="css-xhl574"
        >
          POINTS
        </th>
        <th
          class="css-xhl574"
        >
          PLAYED
        </th>
        <th
          class="css-xhl574"
        >
          WINS
        </th>
        <th
          class="css-xhl574"
        >
          LOSSES
        </th>
        <th
          class="css-xhl574"
        >
          DRAWS
        </th>
      </tr>
    </thead>
    <tbody
      class="css-tdnrhj"
    >
      <tr
        class="css-0"
        role="row"
      >
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          1
        </td>
        <td
          class="css-5mzdyt"
          role="gridcell"
        >
          Brunswick Emus
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          6
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          2
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          2
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          0
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          0
        </td>
      </tr>
      <tr
        class="css-0"
        role="row"
      >
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          1
        </td>
        <td
          class="css-5mzdyt"
          role="gridcell"
        >
          Jane's BBallers
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          6
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          2
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          2
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          0
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          0
        </td>
      </tr>
      <tr
        class="css-0"
        role="row"
      >
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          2
        </td>
        <td
          class="css-5mzdyt"
          role="gridcell"
        >
          Lygon Kangaroos
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          3
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          3
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          1
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          2
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          0
        </td>
      </tr>
      <tr
        class="css-0"
        role="row"
      >
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          2
        </td>
        <td
          class="css-5mzdyt"
          role="gridcell"
        >
          Swinburne Bulls
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          3
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          2
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          1
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          1
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          0
        </td>
      </tr>
      <tr
        class="css-0"
        role="row"
      >
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          3
        </td>
        <td
          class="css-5mzdyt"
          role="gridcell"
        >
          Bye Bye Team
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          0
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          0
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          0
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          0
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          0
        </td>
      </tr>
      <tr
        class="css-0"
        role="row"
      >
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          3
        </td>
        <td
          class="css-5mzdyt"
          role="gridcell"
        >
          John's BBallers
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          0
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          3
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          0
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          3
        </td>
        <td
          class="css-1eyncsv"
          role="gridcell"
        >
          0
        </td>
      </tr>
    </tbody>
  </table>
</div>
`)
    })
})
