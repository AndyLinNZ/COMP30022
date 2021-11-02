import React from 'react'
import { render } from 'utils/test-utils'
import InfoContainer from 'components/InfoContainer'

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

describe('InfoContainer', () => {
    test('renders correctly', () => {
        const { container } = render(<InfoContainer season={stubSeasonData} />)

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
        Summer 2021/2022
      </p>
      <div
        class="chakra-stack css-1equdao"
      >
        <p
          class="chakra-text css-0"
        >
          Sep 17, 2021
        </p>
        <div
          class="css-0"
        >
          -
        </div>
        <p
          class="chakra-text css-0"
        >
          Nov 16, 2021
        </p>
      </div>
    </div>
    <div
      class="css-cv8sgz"
    >
      <div
        class="css-1hsex3l"
      >
        ACTIVE
      </div>
    </div>
  </div>
</div>
`)
    })
})
