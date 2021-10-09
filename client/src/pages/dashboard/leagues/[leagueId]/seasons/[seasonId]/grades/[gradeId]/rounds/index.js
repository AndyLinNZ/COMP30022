import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useGrade, useLeague } from 'hooks'
import { Template, CreateCapsule } from 'components/Dashboard'
import { VStack, HStack, Button } from '@chakra-ui/react'
import { Container, RoundsView } from 'components'

const index = () => {
    const { grade } = useGrade()
    const { league } = useLeague()
    const router = useRouter()

    const hasRounds = grade?.fixture?.length > 0

    return (
        <Template>
            <Head>
                <title>Dribblr | {grade?.name || 'Grade'} - Rounds</title>
            </Head>
            <Container league={league}>
                <VStack spacing="1.25rem" h="100%">
                    <HStack spacing="1rem">
                        <Button bg="greyText.500" color="white">FIXTURE</Button>
                        <Button
                            onClick={() => router.push(window.location.pathname + '/ladder')}
                        >LADDER</Button>
                    </HStack>

                    {hasRounds ?
                        <RoundsView rounds={grade.fixture} />
                        :
                        <CreateCapsule heading="GENERATE ROUNDS AND MATCHES" borderRadius="1rem" />
                    }
                </VStack>
            </Container>
        </Template>
    )
}

export default index
