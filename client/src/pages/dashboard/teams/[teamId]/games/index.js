import React from 'react'
import Head from 'next/head'
import { useUserDetails, useMediaQuerySSR } from 'hooks'
import { Template } from 'components/Dashboard'
import { Box, VStack, HStack } from '@chakra-ui/react'
import Input from 'components/Form/Input'
import { Container } from 'components/Dashboard'
import { getTeamFromUser, createErrorMessage } from 'utils'

const index = () => {
    const { user } = useUserDetails()
    const team = getTeamFromUser(user)
    const isDesktop = useMediaQuerySSR(900)

    const heading = team?.name ? `${team?.name}` : 'Team Info'

    return (
        <Template>
            <Head>
                <title>Dribblr | {team?.name || 'Team Details'}</title>
            </Head>
            <Container heading={heading}>
                <VStack spacing="1.25rem">
                    {team?.players.map((player) => {
                        return (
                            <HStack key={player} spacing="0.5rem" align="center">
                                <Input
                                    minW={isDesktop ? '320px' : '160px'}
                                    size="sm"
                                    bg="white"
                                    borderRadius="1rem"
                                    placeholder={player}
                                />
                            </HStack>
                        )
                    })}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
