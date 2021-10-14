import React from 'react'
import { useRouter } from 'next/router'
import { useMediaQuerySSR } from 'hooks'
import { VStack, HStack, Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react'

const Totals = ({ playersStats }) => {
    let pointTotal = 0

    for (let i = 0; i < playersStats.length; i++) {
        pointTotal += playersStats[i].points
    }

    return (
        <Tr borderTop="2px solid grey" fontWeight="semibold" fontSize="1.1rem">
            <Td>TOTALS</Td>
            <Td paddingLeft="1.75rem">{pointTotal}</Td>
        </Tr>
    )
}

const PlayerData = ({ playerStat }) => {
    return (
        <Tr fontSize="1.1rem">
            <Td>{playerStat.playerId.name}</Td>
            <Td paddingLeft="1.75rem">{playerStat?.points >= 0 ? playerStat?.points : '-'}</Td>
        </Tr>
    )
}

const PlayersTable = ({ playersStats, stats_fields }) => (
    <Box
        h="100%"
        w="100%"
        bg="white"
        borderRadius="1rem"
        boxShadow="0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);"
        padding="1rem"
    >
        <Table variant="striped" size="sm">
            <Thead>
                <Tr borderBottom="2px solid grey" fontWeight="semibold">
                    <Th minW="100px">PLAYER</Th>
                    {stats_fields.map((s) => (
                        <Th key={s}>{s.toUpperCase()}</Th>
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
)

const GameBoxScore = ({ game }) => {
    const router = useRouter()
    const isDesktop = useMediaQuerySSR(860)

    const hasResults = game?.team1.playersStats?.length > 0 && game?.team2.playersStats?.length > 0
    const hasStatus = game?.status
    const STATS_FIELDS = ['points']

    return isDesktop ? (
        <HStack w="full" spacing="0.5rem">
            {hasResults && (
                <PlayersTable playersStats={game.team1.playersStats} stats_fields={STATS_FIELDS} />
            )}
            {hasResults && (
                <PlayersTable playersStats={game.team2.playersStats} stats_fields={STATS_FIELDS} />
            )}
        </HStack>
    ) : (
        <VStack w="full" spacing="0.5rem">
            {hasResults && (
                <PlayersTable playersStats={game.team1.playersStats} stats_fields={STATS_FIELDS} />
            )}
            {hasResults && (
                <PlayersTable playersStats={game.team2.playersStats} stats_fields={STATS_FIELDS} />
            )}
        </VStack>
    )
}

export default GameBoxScore
