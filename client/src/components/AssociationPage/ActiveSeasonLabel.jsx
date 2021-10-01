import { Text } from '@chakra-ui/react'
import React from 'react'

const seasonTextConfig = (seasons) => {
    if (seasons >= 2) {
        return {
            text: 'ACTIVE SEASONS',
            bg: 'activeSeasonBg',
            color: 'activeSeasonColor',
        }
    } else if (seasons == 1) {
        return {
            text: 'ACTIVE SEASON',
            bg: 'activeSeasonBg',
            color: 'activeSeasonColor',
        }
    } else {
        return {
            text: 'NO ACTIVE SEASONS',
            bg: 'inactiveSeasonBg',
            color: 'inactiveSeasonColor',
        }
    }
}
const ActiveSeasonLabel = ({ activeSeasons }) => {
    const { text, ...colors } = seasonTextConfig(activeSeasons)

    return (
        <Text {...colors} borderRadius="5px" py="0.125rem" px="0.5rem" fontSize="0.75rem">
            {text}
        </Text>
    )
}

export default ActiveSeasonLabel
