import React from 'react'
import { render } from 'utils/test-utils'
import HomeHeader from 'components/Header/HomeHeader'

describe('Header', () => {
    test('renders normally', () => {
        const { container } = render(<HomeHeader />)
        expect(container).toMatchInlineSnapshot(`
<div>
  <nav
    class="css-1muww6t"
  >
    <div
      class="css-0"
    >
      <button
        class="chakra-button css-1m0re7z"
        type="button"
      >
        LOGIN
      </button>
    </div>
  </nav>
</div>
`)
    })
})
