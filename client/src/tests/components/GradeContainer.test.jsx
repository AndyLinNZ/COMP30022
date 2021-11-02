import React from 'react'
import { render } from 'utils/test-utils'
import GradeContainer from 'components/GradeContainer'
import { stubGradeData } from 'tests/stub'

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
