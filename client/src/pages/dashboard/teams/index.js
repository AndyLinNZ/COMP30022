import React from 'react'
import Head from 'next/head'
import { useMediaQuerySSR } from 'hooks'
import { Template, Container } from 'components/Dashboard'
import { TeamCapsule, AddTeamCapsule } from 'components/Dashboard/teams'
import { VStack } from '@chakra-ui/react'

const mockTeams = [
    { name: 'Lygon Kangaroos' },
    { name: 'Authentication Geniuses' },
    { name: 'Roaring Rhinosaurs' },
    // { name: 'Sprinting Sandals' },
]
const index = () => {
    const isDesktop = useMediaQuerySSR(940)

    return (
        <Template>
            <Container heading="Stefan's teams">
                <VStack spacing="1.25rem">
                    {mockTeams.map((team, index) => {
                        return <TeamCapsule key={`${team.name}__${index}`} team={team} />
                    })}
                    {mockTeams.length < 4 && <AddTeamCapsule />}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
