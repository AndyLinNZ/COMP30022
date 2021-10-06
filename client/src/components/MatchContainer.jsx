import { Flex, VStack, Text, Divider, Grid } from '@chakra-ui/react'
import { useMediaQuerySSR } from 'hooks'
import { useRouter } from 'next/router'
import Tag from 'components/Dashboard/Tag'
import React from 'react'

const MatchContainer = ({ game }) => {
    const router = useRouter()
    const isDesktop = useMediaQuerySSR(860)
    const { team1, team2, locationName, status, dateStart, _id } = game
    const team1PointsColour = team1.totalPoints >= team2.totalPoints ? "gray.800" : "gray.300"
    const team2PointsColour = team2.totalPoints >= team1.totalPoints ? "gray.800" : "gray.300"
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
            onClick={() => {}}
            paddingX="1rem"
        >
            <Grid templateColumns="3fr 2fr 2fr 2fr 3fr 0.5rem 6fr" gridGap="1rem" alignItems="center" w="100%">
                <Text fontWeight="bold" fontSize="lg">
                    {team1.team.name}
                </Text>
                <Text justifySelf="end" fontSize="4xl" fontWeight="extrabold" color={team1PointsColour}>
                    {team1.totalPoints < 0 ? "-" : team1.totalPoints}
                </Text>
                <Tag type={status} text={status} />
                <Text fontSize="4xl" fontWeight="extrabold" color={team2PointsColour}>
                    {team2.totalPoints < 0 ? "-" : team2.totalPoints}
                </Text>
                <Text justifySelf="end" fontWeight="bold" fontSize="lg">
                    {team2.team.name}
                </Text>
                <Divider orientation="vertical" backgroundColor="gray.600" w="2px" h="75%" justifySelf="end"/>
                <VStack fontSize="lg" justifySelf="start">
                    <Text>{new Date(dateStart).toLocaleString()}</Text>
                    <Text>{locationName}</Text>
                </VStack>
            </Grid>
        </Flex>
    ) : <div>no mobile yet</div>
}

export default MatchContainer
