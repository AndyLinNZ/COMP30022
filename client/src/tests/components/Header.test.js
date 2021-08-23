import React from 'react'
import { render } from 'utils/test-utils'
import Header from 'components/Header'

describe('Header', () => {
    test('renders normally', () => {
        const { container } = render(<Header />)
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
