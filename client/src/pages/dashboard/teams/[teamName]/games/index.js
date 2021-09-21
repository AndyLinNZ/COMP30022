import React from 'react'
import { useGetAllLeagueSeasons, useUserDetails } from 'hooks'
import { Template, CreateCapsule } from 'components/Dashboard'
import { Box, VStack } from '@chakra-ui/react'
import { Container } from 'components/Dashboard'
import { getLeagueFromUser } from 'utils'
import EditButton from 'components/Dashboard/League/EditButton'

const index = () => {
    const { user } = useUserDetails()

    return (
        <Template>
            <Container>
                <VStack spacing="1.25rem"></VStack>
            </Container>
        </Template>
    )
}

export default index
