import React from 'react'
import Head from 'next/head'
import { useTeam, useMediaQuerySSR } from 'hooks'
import { useRouter } from 'next/router'
import { Template } from 'components/Dashboard'
import { List, ListItem, UnorderedList, VStack, HStack, FormLabel } from '@chakra-ui/react'
import { Container } from 'components/Dashboard'

const index = () => {
    const router = useRouter()
    const teamId = router.query?.teamId
    const team = useTeam(teamId)
    const isDesktop = useMediaQuerySSR(860)

    const heading = team?.team?.name ? `${team?.team?.name}` : 'Team Info'
    const tag = `${team?.team?.players?.length} PLAYERS`
    const players = team?.team?.players?.map((player) => ` ${player.name}` + '\n')
    const hover = players?.toString()

    return (
        <Template>
            <Head>
                <title>Dribblr | {team?.team?.name || 'Team Details'}</title>
            </Head>
            <Container heading={heading} tag={tag} hover={hover}>
                <VStack spacing="1.25rem" align="left">
                    <FormLabel fontSize="1.25rem">Players assigned:</FormLabel>
                    <UnorderedList>
                        {team?.team?.players?.map((player) => {
                            return <ListItem>{player.name}</ListItem>
                        })}
                    </UnorderedList>
                </VStack>
            </Container>
        </Template>
    )
}

export default index
