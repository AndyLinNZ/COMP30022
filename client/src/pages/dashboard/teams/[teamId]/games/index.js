import React from 'react'
import Head from 'next/head'
import { useTeam, useGame, useMediaQuerySSR } from 'hooks'
import { useRouter } from 'next/router'
import { Template } from 'components/Dashboard'
import {
    VStack,
    HStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Center,
} from '@chakra-ui/react'
import { Container } from 'components/Dashboard'
import { MatchContainer } from 'components'

const index = () => {
    const router = useRouter()
    const teamId = router.query?.teamId
    const team = useTeam(teamId)
    const isDesktop = useMediaQuerySSR(860)

    const heading = team?.team?.name ? `${team?.team?.name}` : 'Team Info'
    const tag = `${team?.team?.players?.length} PLAYERS`
    const players = team?.team?.players?.map((player) => ` ${player.name}`)
    const playersStats = team?.team?.games.map((game) =>
        game?.team1?.team.id === team?.team?.id
            ? game?.team1?.playersStats
            : game?.team2?.playersStats
    )
    const hover = players?.toString()

    console.log(playersStats)

    const STATS_FIELDS = ['points', 'assists', 'steals']

    const PlayersTable = ({ players, statsFields }) => (
        <Table variant="striped" size="sm">
            <Thead>
                <Tr borderBottom="2px solid grey" fontWeight="semibold">
                    <Th minW="100px">PLAYER</Th>
                    {statsFields.map((s) => (
                        <Th key={s}>{`TOTAL ${s.toUpperCase()}`}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {players?.map((player) => {
                    return (
                        <Tr fontSize="1.1rem">
                            <Td>{player.name}</Td>
                            {statsFields.map((s) => (
                                <Td paddingLeft="1.75rem">{'-'}</Td>
                            ))}
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
    )

    return (
        <Template>
            <Head>
                <title>Dribblr | {team?.team?.name || 'Team Details'}</title>
            </Head>
            <Container heading={heading} tag={tag} hover={hover}>
                <VStack spacing="1.25rem" align="left">
                    <Tabs variant="soft-rounded" colorScheme="gray" w="100%">
                        <TabList w="100%" paddingY="0.5rem" paddingX="1rem" color="greyText.500">
                            <Center w="100%">
                                <Tab mr="1rem">Players</Tab>
                                <Tab ml="1rem">Matches</Tab>
                            </Center>
                        </TabList>
                        <TabPanels w="100%">
                            <TabPanel w="100%" overflow="auto" maxHeight="400px">
                                <PlayersTable
                                    players={team?.team?.players}
                                    statsFields={STATS_FIELDS}
                                />
                            </TabPanel>
                            <TabPanel w="100%" overflow="auto" maxHeight="400px">
                                <VStack spacing="0.5rem" w="100%">
                                    {team?.team?.games.map((game) => (
                                        <HStack key={game._id} w="100%">
                                            <MatchContainer game={game} />
                                        </HStack>
                                    ))}
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </VStack>
            </Container>
        </Template>
    )
}

export default index
