import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useGrade, useLeague, useGame, useSeason } from 'hooks'
import { Template, CreateCapsule } from 'components/Dashboard'
import { VStack, HStack, Button, Divider, Text, Grid, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { Container, RoundsView } from 'components'
import ActiveSeasonLabel from 'components/AssociationPage/ActiveSeasonLabel'
import { ArrowBackIcon, TimeIcon, MinusIcon, StarIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import { IconButton } from "@chakra-ui/react"
import { useMediaQuerySSR } from 'hooks'
import Tag from 'components/Dashboard/Tag'

import { useQuery } from 'react-query'
import { getPlayer, getPlayerStat } from 'api'
import { extractData } from 'utils'

const index = () => {
    const { grade } = useGrade()
    const { league } = useLeague()
    const { season } = useSeason()
    const { game } = useGame()

    const router = useRouter()
    const isDesktop = useMediaQuerySSR(860)

    const hasResults = (game?.team1.playersStats?.length > 0) && (game?.team2.playersStats?.length > 0)
    // const hasResults = game && game?.team1.totalPoints
    const playerStatsLength = game?.team1.playersStats?.length
    const hasStatus = game?.status
    const STATS_FIELDS = ['points']

    const Totals = ({ playersStats }) => {
        var point_total = 0

        for (let i = 0; i < playersStats.length; i++) {
            point_total += playersStats[i].points
        }

        return ( 
            <Tr borderTop="2px solid grey" fontWeight="semibold" fontSize="1.1rem">
                <Td>TOTALS</Td>
                <Td paddingLeft="1.75rem">{point_total}</Td>
            </Tr>
         )
    }

    const PlayerData = ({ playerStat }) => {
        var name = playerStat.playerId?.name
        return ( 
            <Tr fontSize="1.1rem">
                <Td>{playerStat.playerId}</Td>
                <Td paddingLeft="1.75rem">{playerStat?.points >= 0 ? playerStat?.points : "-"}</Td>
            </Tr>
        )
    }

    const PlayersTable = ({ playersStats }) => (

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
                    {STATS_FIELDS.map((s) => <Th key={s}>{s.toUpperCase()}</Th>)}
                </Tr>
            </Thead>
            <Tbody>
                {playersStats.map((playerStat) => (
                    <PlayerData playerStat={playerStat}/>
                ))}
                <Totals playersStats={playersStats} />
            </Tbody>
        </Table>
        </Box>
    )

    const GameDetails = ({season, grade, game}) => {

        return (
        <Box
            h="100%"
            w="100%"
            bg="white"
            borderRadius="1rem"
            boxShadow="0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);"
            padding="1rem"
            overflowY="auto"
            pos="relative"
        >
            <VStack spacing="1.25rem" h="100%">
                <HStack w="full" spacing="0.5rem" >
                    <Button 
                        leftIcon={<ChevronLeftIcon />} 
                        color="greyText.500"
                        _hover={{ bg: "darkGrey" }} 
                        variant="ghost" 
                        fontSize="0.9rem"
                        onClick={() =>
                            router.back()
                        }
                    >
                        BACK
                    </Button>
                    <Text color="greyBg" fontSize="1.1rem" lineHeight="1" pl={15}> {season?.name} </Text>
                    <ChevronRightIcon
                        w={[10, 12]}
                        h={[10, 12]}
                        color={'grey'}
                    />
                    <Text color="greyBg" fontSize="1.1rem" lineHeight="1"> {grade?.name} </Text>
                    {hasStatus && 
                        <Box pos="absolute" top="3" right="3" pt={2.5} pr={2.5}>
                            <Tag type={game.status} text={game.status}/>
                        </Box>
                    }
                </HStack>
                <Divider orientation="horizontal" backgroundColor="gray.500" justifySelf="end" align="top"/>

                {isDesktop ? <Grid templateColumns="3fr 1fr 0.5fr 1fr 3fr" gridGap="1rem" alignItems="center" justifyItems="center" w="100%" fontWeight="semibold" fontSize={isDesktop ? "3rem" : "1.5rem"}>
                    <Text color="greyText.500" fontSize={isDesktop ? "3rem" : "1.5rem"}>{game?.team1?.team?.name}</Text>

                    {hasResults ?
                        <Text justifySelf="end" color="greyText.500" fontSize={isDesktop ? "1rem" : "0.5rem"}> {game?.team1.totalPoints} </Text>
                        :
                        <MinusIcon justifySelf="end" color="greyText.500"/>
                    }

                    <Divider orientation="vertical" backgroundColor="gray.500" justifySelf="center" align="top" fontSize={isDesktop ? "3rem" : "1.5rem"}/>

                    {hasResults ?
                        <Text justifySelf="start" color="greyText.500" fontSize={isDesktop ? "1rem" : "0.5rem"}> {game?.team2.totalPoints} </Text>
                        :
                        <MinusIcon justifySelf="start" color="greyText.500"/>
                    }

                    <Text color="greyText.500">{game?.team2?.team?.name}</Text>

                </Grid> 
                
                :
                <HStack>
                <Grid templateRows="1fr 1fr" gridGap="1rem" alignItems="center" justifyItems="center" w="100%" fontWeight="semibold" fontSize={isDesktop ? "3rem" : "1.5rem"}>
                    <Text justifyItems="center" color="greyText.500">{game?.team1?.team?.name}</Text>

                    {hasResults ?
                        <Text justifyItems="center" color="greyText.500"> 36 </Text>
                        :
                        <MinusIcon color="greyText.500"/>
                    }

                </Grid>
                <Grid templateRows="1fr 1fr" gridGap="1rem" alignItems="center" justifyItems="center" w="100%" fontWeight="semibold" fontSize={isDesktop ? "3rem" : "1.5rem"}>
                    <Text justifyItems="center" color="greyText.500">{game?.team2?.team?.name}</Text>

                    {hasResults ?
                        <Text justifyItems="center" color="greyText.500"> 125 </Text>
                        :
                        <MinusIcon color="greyText.500"/>
                    }

                </Grid>
                </HStack>
                


                }
                <Divider orientation="horizontal" backgroundColor="gray.500" justifySelf="end" align="top"/>


                <Grid templateColumns="1fr 1fr" gridGap="1rem" alignItems="center" w="100%" justifyItems="center">
                    <HStack>
                        <TimeIcon color="greyText.500"/>
                        <Text color="greyText.500">From {new Date(game?.dateStart).toLocaleString()} to {new Date(game?.dateFinish).toLocaleString()} </Text>
                    </HStack>

                    <HStack>
                        <StarIcon color="greyText.500"/>
                        <Text color="greyText.500">{game?.locationName}</Text>
                    </HStack>

                </Grid>
            </VStack>
        </Box>
        )
    }

    const BoxScore = ({game}) => {

        return isDesktop ? (
            <HStack w="full" spacing="0.5rem" >      
                {hasResults && 
                    <PlayersTable playersStats={game.team1.playersStats}/>}
                {hasResults && 
                    <PlayersTable playersStats={game.team2.playersStats}/>}
            </HStack>
        ) : 
        <VStack w="full" spacing="0.5rem" >      
            {hasResults && 
                <PlayersTable playersStats={game.team1.playersStats}/>}
            {hasResults && 
                <PlayersTable playersStats={game.team2.playersStats}/>}
        </VStack>

    }

    return (
        <Template>
            <VStack
                pos="absolute"
                top="35.5%"
                left="50%"
                transform="translate(-50%, -50%)"
                w={['95%', '75%']}
                spacing="0.75rem"
            >
                <VStack spacing="0.25rem" alignSelf="flex-start">
                    <Box fontSize="3rem" lineHeight="1">
                        {league?.name}
                    </Box>
                    <Box
                        alignSelf="flex-start"
                        bg="greyBg"
                        color="white"
                        px="0.5rem"
                        borderRadius="5px"
                    >
                        {league?.organisation}
                    </Box>
                </VStack>
                <GameDetails season={season} grade={grade} game={game}/>
                <BoxScore game={game}/>
            </VStack>
        </Template>
    )
}

export default index
