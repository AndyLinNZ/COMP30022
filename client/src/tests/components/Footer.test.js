import React from 'react'
import { render } from 'utils/test-utils'
import Footer from 'components/Footer'

describe('Footer', () => {
    test('renders normally', () => {
        const { getByText } = render(<Footer />)
        expect(getByText('SIGNUP')).toBeInTheDocument()
    })
})
