import React from 'react'
import { render } from 'utils/test-utils'
import Toast from 'components/Toast'

describe('Toast', () => {
    test('text renders', () => {
        const { getByText } = render(<Toast title={'test'} />)
        expect(getByText('test')).toBeInTheDocument()
    })
    test('error', () => {
        const { container } = render(<Toast title={'test'} type="error" />)
        expect(container.children[0].children[0].children[0]).toHaveAttribute('fill', 'red')
    })

    test('success', () => {
        const { container } = render(<Toast title={'test'} type="success" />)
        expect(container.children[0].children[0].children[0]).toHaveAttribute('fill', 'green')
    })
})
