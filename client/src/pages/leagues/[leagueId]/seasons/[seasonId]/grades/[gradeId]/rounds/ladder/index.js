import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useGrade, useLeague } from 'hooks'
import { Template } from 'components/Dashboard'
import { VStack, HStack, Button, Spinner } from '@chakra-ui/react'
import { Container, Ladder } from 'components'

const index = () => {
    const { grade, isLoading } = useGrade()
    const { league } = useLeague()
    const router = useRouter()

    return (
        <Template>
            <Head>
                <title>Dribblr | {grade?.name || 'Grade'} - Ladder</title>
            </Head>
            <Container
                league={league}
                stepperLoc={window.location.pathname
                    .split('/')
                    .slice(0, window.location.pathname.split('/').length - 3)
                    .join('/')}
            >
                <VStack spacing="1.25rem">
                    <HStack spacing="1rem">
                        <Button
                            onClick={() => {
                                router.push(
                                    window.location.pathname
                                        .split('/')
                                        .slice(0, window.location.pathname.split('/').length - 1)
                                        .join('/')
                                )
                            }}
                        >
                            FIXTURE
                        </Button>
                        <Button bg="greyText.500" color="white">
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
                        <Ladder ladder={grade?.ladder} />
                    )}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
