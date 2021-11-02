import React from 'react'
import ByeContainer from 'components/ByeContainer'
import { render, screen } from 'utils/test-utils'

describe('ByeContainer', () => {
    beforeEach(() => {
        render(<ByeContainer team={{ name: 'abc' }} />)
    })

    test('renders correctly', () => {
        expect(screen.getByText('abc')).toBeInTheDocument()
    })
})
