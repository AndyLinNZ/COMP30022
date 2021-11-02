import React from 'react'
import { useMediaQuerySSR } from 'hooks'
import { HStack, Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react'

const Totals = ({ playersStats }) => {
    const isDesktop = useMediaQuerySSR(860)

    // calculate totals for all columns
    const totals = React.useMemo(() => {
        return playersStats.reduce((prev, next) => {
            return {
                points: (prev.points ? prev.points : 0) + (next.points ? next.points : 0),
                assists: (prev.assists ? prev.assists : 0) + (next.assists ? next.assists : 0),
                steals: (prev.steals ? prev.steals : 0) + (next.steals ? next.steals : 0),
            }
        })
    }, [playersStats])

    return (
        <Tr borderTop="2px solid grey" fontWeight="semibold" fontSize="1.1rem">
            <Td>TOTALS</Td>
            <Td paddingLeft={isDesktop ? '1.75rem' : '1rem'}>{totals?.points}</Td>
            {isDesktop && (
                <>
                    <Td paddingLeft="1.75rem">{totals?.assists}</Td>
                    <Td paddingLeft="1.75rem">{totals?.steals}</Td>{' '}
                </>
            )}
        </Tr>
    )
}

const PlayerData = ({ playerStat }) => {
    const isDesktop = useMediaQuerySSR(860)

    return (
        <Tr fontSize="1.1rem">
            <Td>{playerStat.playerId.name}</Td>
            <Td paddingLeft={isDesktop ? '1.75rem' : '1rem'}>
                {playerStat?.points >= 0 ? playerStat?.points : '-'}
            </Td>
            {isDesktop && (
                <>
                    <Td paddingLeft="1.75rem">
                        {playerStat?.assists >= 0 ? playerStat?.assists : '-'}
                    </Td>
                    <Td paddingLeft="1.75rem">
                        {playerStat?.steals >= 0 ? playerStat?.steals : '-'}
                    </Td>{' '}
                </>
            )}
        </Tr>
    )
}

const PlayersTable = ({ playersStats, stats_fields }) => {
    const isDesktop = useMediaQuerySSR(860)
    return (
        <Box
            h="100%"
            w="100%"
            bg="white"
            borderRadius="1rem"
            boxShadow="0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);"
            padding={isDesktop ? '1rem' : '0.75rem'}
            alignSelf="flex-start"
        >
            <Box w="100%" h="100%" maxH="calc(200px - 2rem)" overflowY="auto">
                <Table variant="striped" size="sm" h="100%">
                    <Thead>
                        <Tr borderBottom="2px solid grey" fontWeight="semibold">
                            <Th minW={isDesktop && '100px'} pr={!isDesktop && '0'}>
                                PLAYER
                            </Th>
                            {stats_fields.map((s) => (
                                <Th key={s} pl={!isDesktop && '0'}>
                                    {typeof s === 'string' && s.toUpperCase()}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {playersStats.map((playerStat) => (
                            <PlayerData key={playerStat._id} playerStat={playerStat} />
                        ))}
                        <Totals playersStats={playersStats} />
                    </Tbody>
                </Table>
            </Box>
        </Box>
    )
}

const GameBoxScore = ({ game }) => {
    const isDesktop = useMediaQuerySSR(860)
    const hasResults = game?.team1.playersStats?.length > 0 && game?.team2.playersStats?.length > 0
    const STATS_FIELDS = ['points']
    if (isDesktop) STATS_FIELDS.push('assists', 'steals')
    return (
        <HStack w="100%" spacing="0.5rem">
            {hasResults && (
                <PlayersTable playersStats={game.team1.playersStats} stats_fields={STATS_FIELDS} />
            )}
            {hasResults && (
                <PlayersTable playersStats={game.team2.playersStats} stats_fields={STATS_FIELDS} />
            )}
        </HStack>
    )
}

export default GameBoxScore
