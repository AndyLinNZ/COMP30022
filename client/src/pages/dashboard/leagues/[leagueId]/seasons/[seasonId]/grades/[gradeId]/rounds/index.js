import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useUserDetails } from 'hooks'
import { Template, CreateCapsule } from 'components/Dashboard'
import { VStack, HStack, Button } from '@chakra-ui/react'
import { Container } from 'components'
import { getSeasonFromUser, getLeagueFromUser } from 'utils'

const index = () => {
    const { user } = useUserDetails()
    const season = getSeasonFromUser(user)
    const league = getLeagueFromUser(user)
    const router = useRouter()

    return (
        <Template>
            <Head>
                <title>Dribblr | {season?.name || 'Season'} - Grades</title>
            </Head>
            <Container league={league}>
                <VStack spacing="1.25rem">
                    <HStack spacing="1rem">
                        <Button bg="greyText.500" color="white">FIXTURE</Button>
                        <Button
                            onClick={() => router.push(window.location.pathname + '/ladder')}
                        >LADDER</Button>
                    </HStack>

                    <CreateCapsule heading="GENERATE ROUNDS AND MATCHES" borderRadius="1rem" />
                </VStack>
            </Container>
        </Template>
    )
}

export default index
