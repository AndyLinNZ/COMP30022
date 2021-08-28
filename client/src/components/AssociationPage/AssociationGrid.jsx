import { SimpleGrid, GridItem } from '@chakra-ui/react'
import React from 'react'
import AssociationCard from 'components/AssociationPage/AssociationCard'

const AssociationGrid = ({ teams, inSeason, upcomingSeason }) => {
    const displayTeams = React.useMemo(() => {
        return teams.filter(({ activeSeasons }) => {
            if (inSeason && activeSeasons >= 1) return true
            if (!inSeason && activeSeasons === 0) return true
            if (upcomingSeason && activeSeasons === 0) return true
            return false
        })
    }, [teams, inSeason, upcomingSeason])
    return (
        <SimpleGrid
            columns={[1, 2, 3]}
            gridRowGap={['1.5rem', '3.5rem']}
            width="100%"
            justifyContent="center"
            columnGap={'2rem'}
        >
            {displayTeams.map(({ name, org, activeSeasons, _id }) => (
                <GridItem
                    key={_id}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <AssociationCard
                        name={name}
                        org={org}
                        activeSeasons={activeSeasons}
                        icon={null}
                    />
                </GridItem>
            ))}
        </SimpleGrid>
    )
}

export default AssociationGrid
