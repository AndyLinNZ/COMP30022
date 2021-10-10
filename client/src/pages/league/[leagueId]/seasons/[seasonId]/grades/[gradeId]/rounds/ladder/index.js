import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useGrade, useLeague } from 'hooks'
import { Template } from 'components/Dashboard'
import { VStack, HStack, Button } from '@chakra-ui/react'
import { Container, Ladder } from 'components'

const index = () => {
    const { grade } = useGrade()
    const { league } = useLeague()
    const router = useRouter()

    return (
        <Template>
            <Head>
                <title>Dribblr | {grade?.name || 'Grade'} - Ladder</title>
            </Head>
            <Container league={league}>
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
                        >FIXTURE</Button>
                        <Button bg="greyText.500" color="white">LADDER</Button>
                    </HStack>
                    <Ladder ladder={grade?.ladder} />
                </VStack>
            </Container>
        </Template>
    )
}

export default index
