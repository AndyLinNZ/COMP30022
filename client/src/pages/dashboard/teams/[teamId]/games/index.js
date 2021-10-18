import React from 'react'
import Head from 'next/head'
import { useTeam, useMediaQuerySSR } from 'hooks'
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
    Tabs,
    TabList,
    TabPanels,
    Tab,
    Text,
    TabPanel,
    Center,
    IconButton,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Container } from 'components/Dashboard'
import { MatchContainer } from 'components'

const index = () => {
    const router = useRouter()
    const teamId = router.query?.teamId
    const team = useTeam(teamId)
    const isDesktop = useMediaQuerySSR(600)

    const heading = team?.team?.name ? `${team?.team?.name}` : 'Team Info'
    const tag = `${team?.team?.players ? team?.team?.players.length : 0} PLAYERS`
    const players = team?.team?.players?.map((player) => ` ${player.name}`)
    const gamesStats = team?.team?.games
        .filter(function (game) {
            return game?.status === 'completed'
        })
        .map((game) =>
            game?.team1?.team.id === team?.team?.id
                ? game?.team1?.playersStats
                : game?.team2?.playersStats
        )
    const hover = players?.toString()

    const STATS_FIELDS = ['points', 'assists', 'steals']

    const Averages = ({ stats, playerId, gamesStats }) => {
        let statsTotal = 0

        // calculate averages for each statistic
        for (let i = 0; i < gamesStats.length; i++) {
            for (let j = 0; j < gamesStats[i].length; j++) {
                gamesStats[i][j].playerId === playerId &&
                    stats === 'points' &&
                    gamesStats[i][j].points &&
                    (statsTotal = statsTotal + gamesStats[i][j].points)
                gamesStats[i][j].playerId === playerId &&
                    stats === 'assists' &&
                    gamesStats[i][j].assists &&
                    (statsTotal = statsTotal + gamesStats[i][j].assists)
                gamesStats[i][j].playerId === playerId &&
                    stats === 'steals' &&
                    gamesStats[i][j].steals &&
                    (statsTotal = statsTotal + gamesStats[i][j].steals)
            }
        }

        return gamesStats.length !== 0 ? (
            <Td paddingLeft="1.75rem">
                {Math.round((statsTotal / gamesStats.length) * 100) / 100}
            </Td>
        ) : (
            <Td paddingLeft="1.75rem">0</Td>
        )
    }

    const PlayersTable = ({ players, statsFields }) => (
        <Table variant="striped" size="sm">
            <Thead>
                <Tr borderBottom="2px solid grey" fontWeight="semibold">
                    <Th minW="100px">PLAYER</Th>
                    {statsFields.map((s) => (
                        <Th key={s}>{`AVERAGE ${s.toUpperCase()}`}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {players?.map((player) => {
                    return (
                        <Tr key={player.id} fontSize="1.1rem">
                            <Td>{player.name}</Td>
                            {statsFields.map((s, index) => (
                                <Averages
                                    key={index}
                                    stats={s}
                                    playerId={player.id}
                                    gamesStats={gamesStats}
                                />
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
                <IconButton
                    icon={<ArrowBackIcon />}
                    size={isDesktop ? 'md' : 'xs'}
                    boxSize={isDesktop ? 6 : null}
                    alignSelf="center"
                    justifySelf="center"
                    position="absolute"
                    left="0rem"
                    transform="translateX(-40%)"
                    color="white"
                    bg="greyBg"
                    onClick={() => router.back()}
                />
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
                                {team?.team?.games?.length !== 0 ? (
                                    <VStack spacing="0.5rem" w="100%">
                                        {team?.team?.games.map((game) => (
                                            <HStack key={game._id} w="100%">
                                                <MatchContainer game={game} />
                                            </HStack>
                                        ))}
                                    </VStack>
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
                                        Not assigned to any games!
                                    </Text>
                                )}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </VStack>
            </Container>
        </Template>
    )
}

export default index
