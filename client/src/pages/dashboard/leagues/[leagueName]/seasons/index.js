import React from 'react'
import { useGetAllLeagueSeasons, useUserDetails } from 'hooks'
import { Template, CreateCapsule } from 'components/Dashboard'
import { Box, VStack } from '@chakra-ui/react'
import { Container, InfoContainer } from 'components/Dashboard/League'
import { getLeagueFromUser } from 'utils'
import EditButton from 'components/Dashboard/League/EditButton'

const index = () => {
    const { seasons } = useGetAllLeagueSeasons()
    const { user } = useUserDetails()
    const league = getLeagueFromUser(user)

    return (
        <Template>
            <Container league={league}>
                <VStack spacing="1.25rem">
                    <CreateCapsule heading="ADD A NEW SEASON" />
                    {seasons?.map((season) => {
                        return (
                            <Box
                                key={season._id}
                                display="grid"
                                gridTemplateColumns="12fr 1fr"
                                w="100%"
                            >
                                <InfoContainer season={season} path={`${season.name}/grades`} />
                                <EditButton name={season.name} />
                            </Box>
                        )
                    })}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
