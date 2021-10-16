import React from 'react'
import { useRouter } from 'next/router'
import { useMediaQuerySSR } from 'hooks'
import { VStack, HStack, Button, Divider, Text, Grid, Box } from '@chakra-ui/react'
import { TimeIcon, MinusIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { appPaths } from 'utils/constants'
import Tag from 'components/Dashboard/Tag'
import LocationIcon from 'components/svg/LocationIcon'

const GameContainer = ({ season, grade, game }) => {
    const hasResults = game?.team1.playersStats?.length > 0 && game?.team2.playersStats?.length > 0
    const hasStatus = game?.status
    const isDesktop = useMediaQuerySSR(860)
    const router = useRouter()
    
    const team1PointsColour =
        game?.team1.totalPoints >= game?.team2.totalPoints ? 'gray.500' : 'gray.300'
    const team2PointsColour =
        game?.team2.totalPoints >= game?.team1.totalPoints ? 'gray.500' : 'gray.300'

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
            <VStack spacing={['0.75rem', '1.25rem']} h="100%">
                <HStack w="full" spacing="0.5rem">
                    <Button
                        leftIcon={<ChevronLeftIcon />}
                        color="greyText.500"
                        _hover={{ bg: 'darkGrey' }}
                        variant="ghost"
                        fontSize={isDesktop ? '0.9rem' : '0.7rem'}
                        onClick={() => router.back()}
                    >
                        BACK
                    </Button>
                    <Text
                        color="greyBg"
                        fontSize={isDesktop ? '1.1rem' : '0.8rem'}
                        lineHeight="1"
                        pl={15}
                        cursor="pointer"
                        _hover={{ color: 'darkGrey' }}
                    >
                        <a
                            href={`${appPaths.LEAGUE_PATH}/${game?.paths?.leagueId}/seasons/${game?.paths?.seasonId}/grades`}
                            rel="noreferrer"
                        >
                            {season?.name}
                        </a>
                    </Text>
                    <ChevronRightIcon w={[10, 12]} h={[10, 12]} color={'grey'} />
                    <Text
                        color="greyBg"
                        fontSize={isDesktop ? '1.1rem' : '0.8rem'}
                        lineHeight="1"
                        cursor="pointer"
                        _hover={{ color: 'darkGrey' }}
                    >
                        <a
                            href={`${appPaths.LEAGUE_PATH}/${game?.paths?.leagueId}/seasons/${game?.paths?.seasonId}/grades/${game?.paths?.gradeId}/rounds`}
                            rel="noreferrer"
                        >
                            {grade?.name}
                        </a>
                    </Text>
                    {hasStatus && isDesktop && (
                        <Box pos="absolute" top="3" right="3" py={2.5} px={2.5}>
                            <Tag type={game.status} text={game.status} />
                        </Box>
                    )}
                </HStack>
                {hasStatus && !isDesktop && (
                    <Box align="center">
                        <Tag type={game.status} text={game.status} />
                    </Box>
                )}
                <Divider
                    orientation="horizontal"
                    backgroundColor="gray.500"
                    justifySelf="end"
                    align="top"
                />

                {isDesktop ? (
                    <Grid
                        templateColumns="3fr 1fr 0.5fr 1fr 3fr"
                        gridGap="1rem"
                        alignItems="center"
                        justifyItems="center"
                        w="100%"
                        fontWeight="semibold"
                        fontSize={isDesktop ? '3rem' : '1.5rem'}
                    >
                        <Text
                            _hover={{
                                cursor: 'pointer',
                                color: 'darkGrey',
                            }}
                            color="greyText.500"
                            fontSize={isDesktop ? '3rem' : '1.5rem'}
                            onClick={() =>
                                router.push(
                                    `${appPaths.DASHBOARD_TEAMS_PATH}/${game?.team1?.team._id}/games`
                                )
                            }
                        >
                            {game?.team1?.team?.name}
                        </Text>

                        {hasResults ? (
                            <Text justifySelf="end" color={team1PointsColour}>
                                {game.team1.totalPoints}
                            </Text>
                        ) : (
                            <MinusIcon justifySelf="end" color="greyText.500" />
                        )}

                        <Divider
                            orientation="vertical"
                            backgroundColor="gray.500"
                            justifySelf="center"
                            align="top"
                            fontSize={isDesktop ? '3rem' : '1.5rem'}
                        />

                        {hasResults ? (
                            <Text justifySelf="start" color={team2PointsColour}>
                                {game.team2.totalPoints}
                            </Text>
                        ) : (
                            <MinusIcon justifySelf="start" color="greyText.500" />
                        )}

                        <Text
                            _hover={{
                                cursor: 'pointer',
                                color: 'darkGrey',
                            }}
                            color="greyText.500"
                            fontSize={isDesktop ? '3rem' : '1.5rem'}
                            onClick={() =>
                                router.push(
                                    `${appPaths.DASHBOARD_TEAMS_PATH}/${game?.team2?.team._id}/games`
                                )
                            }
                        >
                            {game?.team2?.team?.name}
                        </Text>
                    </Grid>
                ) : (
                    <VStack>
                        <Grid
                            templateColumns="1fr 1fr"
                            gridGap="1rem"
                            alignItems="center"
                            justifyItems="center"
                            w="100%"
                            fontWeight="semibold"
                            fontSize={isDesktop ? '3rem' : '1.5rem'}
                        >
                            <Text justifyItems="center" color="greyText.500">
                                {game?.team1?.team?.name}
                            </Text>
                            <Text justifyItems="center" color="greyText.500">
                                {game?.team2?.team?.name}
                            </Text>
                        </Grid>
                        <Grid
                            templateColumns="1fr 1fr"
                            gridGap="1rem"
                            alignItems="center"
                            justifyItems="center"
                            w="100%"
                            fontWeight="semibold"
                            fontSize={isDesktop ? '3rem' : '1.5rem'}
                        >
                            {hasResults ? (
                                <Text justifyItems="center" color={team1PointsColour}>
                                    {game.team1.totalPoints}
                                </Text>
                            ) : (
                                <MinusIcon color="greyText.500" />
                            )}
                            {hasResults ? (
                                <Text justifyItems="center" color={team2PointsColour}>
                                    {game.team2.totalPoints}
                                </Text>
                            ) : (
                                <MinusIcon color="greyText.500" />
                            )}
                        </Grid>
                    </VStack>
                )}
                <Divider
                    orientation="horizontal"
                    backgroundColor="gray.500"
                    justifySelf="end"
                    align="top"
                />

                <Grid
                    templateColumns="1fr 1fr"
                    gridGap="1rem"
                    alignItems="center"
                    w="100%"
                    justifyItems="center"
                >
                    <HStack>
                        <TimeIcon color="greyText.500" />
                        <Text color="greyText.500">
                            {new Date(game?.dateStart).toLocaleString()}
                        </Text>
                    </HStack>

                    <HStack>
                        <LocationIcon width={24} color="greyText.500" />
                        <Text color="greyText.500">{game?.locationName}</Text>
                    </HStack>
                </Grid>
            </VStack>
        </Box>
    )
}

export default GameContainer
