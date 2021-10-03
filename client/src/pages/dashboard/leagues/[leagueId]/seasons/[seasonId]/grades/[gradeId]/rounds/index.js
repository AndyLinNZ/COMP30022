import React from 'react'
import Head from 'next/head'
import { useGetAllSeasonGrades, useUserDetails } from 'hooks'
import { Template, CreateCapsule } from 'components/Dashboard'
import { Box, VStack } from '@chakra-ui/react'
import { Container } from 'components'
import { getSeasonFromUser, getLeagueFromUser } from 'utils'

const index = () => {
    const { user } = useUserDetails()
    const season = getSeasonFromUser(user)
    const league = getLeagueFromUser(user)

    return (
        <Template>
            <Head>
                <title>Dribblr | {season?.name || 'Season'} - Grades</title>
            </Head>
            <Container league={league}>
                <VStack spacing="1.25rem">
                    <CreateCapsule heading="GENERATE ROUNDS AND MATCHES" borderRadius="1rem" />
                </VStack>
            </Container>
        </Template>
    )
}

export default index
