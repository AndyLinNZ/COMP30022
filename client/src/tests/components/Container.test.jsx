import React from 'react'
import Container from 'components/Container'
import { render } from 'utils/test-utils'

describe('Container', () => {
    test('renders correctly', () => {
        const { container } = render(<Container team={{ name: 'abc' }} />)

        expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="chakra-stack css-5lb6ao"
  >
    <div
      class="chakra-stack css-hguum2"
    >
      <div
        class="css-chqakd"
      >
        <a
          href="/leagues/undefined/seasons"
        />
      </div>
      <div
        class="css-1ksziuu"
      />
    </div>
    <div
      class="css-3syujm"
    >
      <button
        class="chakra-button css-wcpsv2"
        type="button"
      >
        <svg
          aria-hidden="true"
          class="chakra-icon css-onkibi"
          focusable="false"
          viewBox="0 0 24 24"
        >
          <path
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
            fill="currentColor"
          />
        </svg>
      </button>
      <div
        class="chakra-stack css-2njtea"
      >
        <div
          class="chakra-stack css-7z7omd"
        >
          <p
            class="chakra-text css-t2hoao"
          >
            SEASON
          </p>
          <svg
            class="chakra-icon css-19qhf12"
            focusable="false"
            viewBox="0 0 24 24"
          >
            <path
              d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="chakra-stack css-7z7omd"
        >
          <p
            class="chakra-text css-13oel9n"
          >
            GRADE
          </p>
          <svg
            class="chakra-icon css-1lui86g"
            focusable="false"
            viewBox="0 0 24 24"
          >
            <path
              d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="chakra-stack css-7z7omd"
        >
          <p
            class="chakra-text css-t2hoao"
          >
            ROUND
          </p>
        </div>
      </div>
    </div>
    <div
      class="css-xfbzei"
    />
  </div>
</div>
`)
    })
})
