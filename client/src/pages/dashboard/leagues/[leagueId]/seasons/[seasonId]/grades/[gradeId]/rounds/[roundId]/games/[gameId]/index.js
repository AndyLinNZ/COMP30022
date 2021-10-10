import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useGrade, useLeague, useGame, useSeason } from 'hooks'
import { Template, CreateCapsule } from 'components/Dashboard'
import { VStack, HStack, Button, Divider, Text, Grid } from '@chakra-ui/react'
import { Container, RoundsView } from 'components'
import ActiveSeasonLabel from 'components/AssociationPage/ActiveSeasonLabel'
import { ArrowBackIcon, TimeIcon, MinusIcon, StarIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import { IconButton } from "@chakra-ui/react"
import { useMediaQuerySSR } from 'hooks'
import Tag from 'components/Dashboard/Tag'

const index = () => {
    const { grade } = useGrade()
    const { league } = useLeague()
    const { season } = useSeason()
    const { game } = useGame()

    const router = useRouter()
    const isDesktop = useMediaQuerySSR(860)

    const hasResults = (game?.team1?.playerStats?.length > 0) && (game?.team2?.playerStats?.length > 0)
    const hasStatus = game?.status

    return (
        <Template>
            <Container league={league}>
                <VStack spacing="1.25rem" h="100%">
                    <HStack w="full" spacing="0.5rem" >
                        <Box>
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
                        </Box>
                        <Box w="20%" fontSize="1.1rem" lineHeight="1" pl={15}>
                            {season?.name}
                        </Box>
                        <ChevronRightIcon
                            w={[10, 12]}
                            h={[10, 12]}
                            color={'grey'}
                        />
                        <Box w="20%" fontSize="1.1rem" lineHeight="1">
                            {grade?.name}
                        </Box>
                        {hasStatus && 
                            <Box pos="absolute" top="3" right="3" pt={2.5} pr={2.5}>
                                <Tag type={game.status} text={game.status}/>
                            </Box>
                        }
                    </HStack>
                    <Divider orientation="horizontal" backgroundColor="gray.600" justifySelf="end" align="top"/>


                    <Grid templateColumns="3fr 1fr 0.5fr 1fr 3fr" gridGap="1rem" alignItems="center" w="100%" fontWeight="semibold" fontSize="3rem">
                        <Text justifySelf="center">{game?.team1?.team?.name}</Text>

                        {hasResults ?
                            <Text justifySelf="end"> {game?.team1?.totalPoints} </Text>
                            :
                            <MinusIcon justifySelf="end"/>
                        }

                        <Divider orientation="vertical" backgroundColor="gray.600" justifySelf="center" align="top"/>

                        {hasResults ?
                            <Text justifySelf="start"> {game?.team2?.totalPoints} </Text>
                            :
                            <MinusIcon justifySelf="start"/>
                        }
                        <Text justifySelf="center">{game?.team2?.team?.name}</Text>

                    </Grid>
                    <Divider orientation="horizontal" backgroundColor="gray.600" justifySelf="end" align="top"/>


                    <Grid templateColumns="1fr 1fr" gridGap="1rem" alignItems="center" w="100%" justifyItems="center">
                        <HStack>
                            <TimeIcon />
                            <Text>{new Date(game?.dateStart).toLocaleString()} to {new Date(game?.dateFinish).toLocaleString()} </Text>
                        </HStack>

                        <HStack>
                            <StarIcon />
                            <Text>{game?.locationName}</Text>
                        </HStack>

                    </Grid>
                </VStack>
            </Container>
        </Template>
    )
}

export default index
