import React from 'react'
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
    Center,
    VStack,
    HStack,
} from '@chakra-ui/react'
import { MatchContainer, ByeContainer } from 'components'
import EditButton from 'components/Dashboard/League/EditButton'
import UpdatePlayerStatsIcon from 'components/svg/UpdatePlayerStatsIcon'

// if using this for the non-logged in user pages, it might be good to add a
// "showEditButtons" prop or something to hide the edit buttons
const RoundsView = ({ rounds }) => {
    return (
        <Tabs variant="soft-rounded" colorScheme="gray" w="100%">
            <TabList background="greyText.500" paddingY="0.8rem" paddingX="1rem" borderRadius="8px">
                <Center>
                    <Text color="white" fontWeight="bold" mr="1rem">
                        ROUND
                    </Text>
                </Center>
                {rounds.map((_, i) => {
                    return (
                        <Tab key={i} color="white" ml="0.4rem" w="1rem" h="2rem">
                            {(i + 1).toString()}
                        </Tab>
                    )
                })}
            </TabList>
            <TabPanels w="100%">
                {rounds.map((round) => {
                    return (
                        <TabPanel paddingY="1rem" paddingX="0" w="100%" key={round._id}>
                            <VStack spacing="0.5rem" w="100%">
                                {round.games.map((game) => (
                                    <HStack key={game._id} w="100%">
                                        <MatchContainer game={game} />
                                        {game.status === 'upcoming' ? (
                                            <EditButton name={`${round._id}/games/${game._id}`} />
                                        ) : (
                                            <EditButton
                                                name={`${round._id}/games/${game._id}`}
                                                icon={<UpdatePlayerStatsIcon />}
                                                path="stats"
                                            />
                                        )}
                                    </HStack>
                                ))}
                                {round.teamsOnBye.map((team) => (
                                    <ByeContainer key={team._id} team={team} />
                                ))}
                            </VStack>
                        </TabPanel>
                    )
                })}
            </TabPanels>
        </Tabs>
    )
}

export default RoundsView
