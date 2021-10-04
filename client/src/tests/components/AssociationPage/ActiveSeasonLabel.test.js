import React from 'react'
import { render } from 'utils/test-utils'
import ActiveSeasonLabel from 'components/AssociationPage/ActiveSeasonLabel'

describe('Footer', () => {
    test('"NO ACTIVE SEASONS" when no prop is passed in', () => {
        const { getByText } = render(<ActiveSeasonLabel />)
        expect(getByText('NO ACTIVE SEASONS')).toBeInTheDocument()
    })
    test('"NO ACTIVE SEASONS" when 0 is passed in', () => {
        const { getByText } = render(<ActiveSeasonLabel activeSeasons={0} />)
        expect(getByText('NO ACTIVE SEASONS')).toBeInTheDocument()
    })
    test('"ACTIVE SEASON" when 1 is passed in', () => {
        const { getByText } = render(<ActiveSeasonLabel activeSeasons={1} />)
        expect(getByText('ACTIVE SEASON')).toBeInTheDocument()
    })
    test('"ACTIVE SEASONS" when no 2 is passed in', () => {
        const { getByText } = render(<ActiveSeasonLabel activeSeasons={2} />)
        expect(getByText('ACTIVE SEASONS')).toBeInTheDocument()
    })
    test('"ACTIVE SEASONS" when a number larger than 2 is passed in', () => {
        const { getByText } = render(<ActiveSeasonLabel activeSeasons={100} />)
        expect(getByText('ACTIVE SEASONS')).toBeInTheDocument()
    })
})
