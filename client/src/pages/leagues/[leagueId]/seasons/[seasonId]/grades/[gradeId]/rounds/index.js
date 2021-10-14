import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useGrade, useLeague } from 'hooks'
import { Template } from 'components/Dashboard'
import { VStack, HStack, Button, Text } from '@chakra-ui/react'
import { Container, RoundsView } from 'components'

const index = () => {
    const { grade, isLoading } = useGrade()
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
                        <Button bg="greyText.500" color="white">
                            FIXTURE
                        </Button>
                        <Button onClick={() => router.push(window.location.pathname + '/ladder')}>
                            LADDER
                        </Button>
                    </HStack>
                    {isLoading ? (
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                            position="absolute"
                            top="50%"
                            left="calc(50% - 1rem)"
                        />
                    ) : (
                        <>
                            {hasRounds ? (
                                <RoundsView rounds={grade.fixture} showEditButtons={false} />
                            ) : (
                                <Text
                                    fontSize="2rem"
                                    textAlign="center"
                                    color="greyText"
                                    pos="absolute"
                                    top="50%"
                                    left="50%"
                                    transform="translate(-50%, -50%)"
                                >
                                    This Grade does not have a fixture yet!
                                </Text>
                            )}
                        </>
                    )}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
