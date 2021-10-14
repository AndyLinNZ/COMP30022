import React from 'react'
import { useRouter } from 'next/router'
import { appPaths } from 'utils/constants'
import { Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react'

const Ladder = ({ ladder }) => {
    const router = useRouter()

    return ladder ? (
        <Table variant="striped" size="sm">
            <Thead>
                <Tr borderBottom="2px solid grey">
                    <Th fontSize="1rem">#</Th>
                    <Th fontSize="1rem">TEAM</Th>
                    <Th fontSize="1rem">POINTS</Th>
                    <Th fontSize="1rem">PLAYED</Th>
                    <Th fontSize="1rem">WINS</Th>
                    <Th fontSize="1rem">LOSSES</Th>
                    <Th fontSize="1rem">DRAWS</Th>
                </Tr>
            </Thead>
            <Tbody>
                {ladder.map((ladderEntry) => {
                    let { wins, losses, draws, totalPoints } = ladderEntry.keyStats
                    const played = wins + losses + draws
                    return (
                        <Tr>
                            <Td>{ladderEntry.rank}</Td>
                            <Td
                                _hover={{
                                    cursor: 'pointer',
                                    color: 'darkGrey',
                                }}
                                onClick={() =>
                                    router.push(
                                        `${appPaths.DASHBOARD_TEAMS_PATH}/${ladderEntry.team.id}/games`
                                    )
                                }
                            >
                                {ladderEntry.team.name}
                            </Td>
                            <Td>{totalPoints}</Td>
                            <Td>{played}</Td>
                            <Td>{wins}</Td>
                            <Td>{losses}</Td>
                            <Td>{draws}</Td>
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
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
            No games played yet!
        </Text>
    )
}

export default Ladder
