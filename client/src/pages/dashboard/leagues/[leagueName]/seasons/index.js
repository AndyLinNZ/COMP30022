import React from 'react'
import { useGetAllLeagueSeasons, useUserDetails } from 'hooks'
import { Template, CreateCapsule } from 'components/Dashboard'
import { VStack } from '@chakra-ui/react'
import { Container, InfoContainer } from 'components/Dashboard/League'
import { getLeagueFromUser } from 'utils'

const index = () => {
    const { seasons } = useGetAllLeagueSeasons()
    const { user } = useUserDetails()
    const league = getLeagueFromUser(user)

    return (
        <Template>
            <Container league={league}>
                <VStack spacing="1.25rem">
                    {seasons?.map((season) => {
                        return (
                            <InfoContainer key={season._id} season={season} path={season._id} />
                        )
                    })}
                    <CreateCapsule heading="ADD A NEW SEASON" />
                </VStack>
            </Container>
        </Template>
    )
}

export default index
