import React from 'react'
import { render } from 'utils/test-utils'
import InfoContainer from 'components/InfoContainer'
import { stubSeasonData } from 'tests/stub'

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
          Sep 16, 2021
        </p>
        <div
          class="css-0"
        >
          -
        </div>
        <p
          class="chakra-text css-0"
        >
          Nov 15, 2021
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
