import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useGrade, useLeague, useGame, useSeason } from 'hooks'
import { Template, CreateCapsule } from 'components/Dashboard'
import { VStack, HStack, Button } from '@chakra-ui/react'
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
                                fontSize="1.25rem"
                                onClick={() =>
                                    router.back()
                                }
                            >
                                BACK
                            </Button>
                        </Box>
                        <Box w="20%" fontSize="1rem" lineHeight="1">
                            {season?.name}
                        </Box>
                        <ChevronRightIcon
                            w={[10, 12]}
                            h={[10, 12]}
                            color={'grey'}
                        />
                        <Box w="20%" fontSize="1rem" lineHeight="1">
                            {grade?.name}
                        </Box>
                        {hasStatus && 
                            <Box pos="absolute" top="3" right="3" py={2.5} px={2.5}>
                                <Tag type={game.status} text={game.status}/>
                            </Box>
                        }
                    </HStack>

                    <HStack spacing="1rem">
                        <Box fontSize="1rem" lineHeight="1">
                                {game?.team1?.team?.name}
                        </Box>
                        {hasResults ?
                            <Box fontSize="1rem" lineHeight="1">
                                {game?.team1?.totalPoints}
                                {game?.team2?.totalPoints}
                            </Box>
                            :
                            <Box fontSize="1rem" lineHeight="1">
                                <MinusIcon/>
                                <MinusIcon/>
                            </Box>
                        }
                        
                        <Box fontSize="1rem" lineHeight="1">
                                {game?.team2?.team?.name}
                        </Box>
                    </HStack>

                    <HStack spacing="1rem">
                        <TimeIcon />
                        <Box fontSize="1rem" lineHeight="1">
                                {new Date(game?.dateStart).toLocaleString()} - {new Date(game?.dateFinish).toLocaleString()} 
                        </Box>
                        <StarIcon />
                        <Box fontSize="1rem" lineHeight="1">
                                {game?.locationName}
                        </Box>
                    </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default index
