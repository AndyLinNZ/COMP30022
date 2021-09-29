import React from 'react'
import Head from 'next/head'
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
            <Head>
                <title>Dribblr | Team Details</title>
            </Head>
            <Container>
                <VStack spacing="1.25rem"></VStack>
            </Container>
        </Template>
    )
}

export default index
