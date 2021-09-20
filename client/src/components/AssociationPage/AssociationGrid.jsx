import { SimpleGrid, GridItem } from '@chakra-ui/react'
import React from 'react'
import AssociationCard from 'components/AssociationPage/AssociationCard'

const AssociationGrid = ({ leagues, inSeason, upcomingSeason }) => {
    const displayLeagues = React.useMemo(() => {
        return leagues?.filter(({ seasons }) => {
            if (inSeason && seasons.length >= 1) return true
            if (!inSeason && seasons.length === 0) return true
            if (upcomingSeason && seasons.length === 0) return true
            return false
        })
    }, [leagues, inSeason, upcomingSeason])

    return (
        <SimpleGrid
            columns={[1, 2, 3]}
            gridRowGap={['1.5rem', '3.5rem']}
            width="100%"
            justifyContent="center"
            columnGap={'2rem'}
        >
            {displayLeagues?.map(({ name, organisation, seasons, _id }) => (
                <GridItem key={_id} display="flex" alignItems="center" justifyContent="center">
                    <AssociationCard
                        name={name}
                        org={organisation}
                        activeSeasons={seasons.length}
                        icon={null}
                    />
                </GridItem>
            ))}
        </SimpleGrid>
    )
}

export default AssociationGrid
