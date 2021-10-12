import { Box, Flex, VStack, HStack, Text, Divider, Grid, GridItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMediaQuerySSR } from 'hooks'
import LocationIcon from 'components/svg/LocationIcon'
import { TimeIcon } from '@chakra-ui/icons'
import Tag from 'components/Dashboard/Tag'
import React from 'react'

const MatchContainer = ({ game }) => {
    const router = useRouter()
    const isDesktop = useMediaQuerySSR(860)
    const { team1, team2, locationName, status, dateStart } = game
    const team1PointsColour = team1.totalPoints >= team2.totalPoints ? 'gray.800' : 'gray.300'
    const team2PointsColour = team2.totalPoints >= team1.totalPoints ? 'gray.800' : 'gray.300'
    return isDesktop ? (
        <Flex
            w="100%"
            h="100px"
            borderRadius="1rem"
            border="2px solid grey"
            pos="relative"
            cursor="pointer"
            transition="box-shadow 0.8s ease"
            _hover={{
                boxShadow: '0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);',
            }}
            onClick={() =>
                router.push(
                    `${window.location.pathname
                        .split('/')
                        .filter((path) => path !== 'dashboard')
                        .join('/')}/${game.round}/games/${game._id}`
                )
            }
            paddingX="1rem"
        >
            <Grid
                templateColumns="3fr 2fr 2fr 2fr 3fr 0.5rem 6fr"
                gridGap="1rem"
                alignItems="center"
                w="100%"
            >
                <Text fontWeight="bold" fontSize="lg">
                    {team1.team.name}
                </Text>
                <Text
                    justifySelf="end"
                    fontSize="4xl"
                    fontWeight="extrabold"
                    color={team1PointsColour}
                >
                    {team1.totalPoints < 0 ? '-' : team1.totalPoints}
                </Text>
                <Tag type={status} text={status} />
                <Text fontSize="4xl" fontWeight="extrabold" color={team2PointsColour}>
                    {team2.totalPoints < 0 ? '-' : team2.totalPoints}
                </Text>
                <Text justifySelf="end" fontWeight="bold" fontSize="lg">
                    {team2.team.name}
                </Text>
                <Divider
                    orientation="vertical"
                    backgroundColor="gray.600"
                    w="2px"
                    h="75%"
                    justifySelf="end"
                />
                <VStack fontSize="lg" justifySelf="start" alignItems="start">
                    <HStack>
                        <TimeIcon color="greyText.500" />
                        <Text>{new Date(dateStart).toLocaleString()}</Text>
                    </HStack>
                    <HStack>
                        <LocationIcon width={24} />
                        <Text>{locationName}</Text>
                    </HStack>
                </VStack>
            </Grid>
        </Flex>
    ) : (
        <Box
            w="100%"
            borderRadius="1rem"
            border="2px solid grey"
            pos="relative"
            cursor="pointer"
            transition="box-shadow 0.8s ease"
            _hover={{
                boxShadow: '0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);',
            }}
            onClick={() => {}}
            paddingX="1rem"
        >
            <Grid
                templateColumns="2fr 1fr"
                templateRows="2fr 1fr 2fr 0.5rem 2.5fr"
                gridGap="0.2rem"
                alignItems="center"
                w="100%"
            >
                <GridItem colStart={1} rowStart={1}>
                    <Text fontWeight="bold" fontSize="md">
                        {team1.team.name}
                    </Text>
                </GridItem>
                <GridItem colStart={2} rowStart={1} justifySelf="center">
                    <Text fontSize="2xl" fontWeight="extrabold" color={team1PointsColour}>
                        {team1.totalPoints < 0 ? '-' : team1.totalPoints}
                    </Text>
                </GridItem>
                <GridItem colStart={2} rowStart={2} justifySelf="center">
                    <Tag type={status} text={status} />
                </GridItem>
                <GridItem colStart={1} rowStart={3}>
                    <Text fontWeight="bold" fontSize="md">
                        {team2.team.name}
                    </Text>
                </GridItem>
                <GridItem colStart={2} rowStart={3} justifySelf="center">
                    <Text fontSize="2xl" fontWeight="extrabold" color={team2PointsColour}>
                        {team2.totalPoints < 0 ? '-' : team2.totalPoints}
                    </Text>
                </GridItem>
                <GridItem colStart={1} rowStart={4} colSpan={2}>
                    <Divider orientation="horizontal" backgroundColor="gray.600" h="2px" />
                </GridItem>
                <GridItem
                    colStart={1}
                    rowStart={5}
                    colSpan={2}
                    alignSelf="start"
                    justifySelf="start"
                >
                    <VStack fontSize="sm" alignItems="start">
                        <HStack>
                            <TimeIcon color="greyText.500" />
                            <Text>{new Date(dateStart).toLocaleString()}</Text>
                        </HStack>
                        <HStack>
                            <LocationIcon width={24} />
                            <Text>{locationName}</Text>
                        </HStack>
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default MatchContainer
