import React from 'react'
import { useRouter } from 'next/router'
import { useGrade, useLeague, useGame, useSeason, useMediaQuerySSR } from 'hooks'
import { Template } from 'components/Dashboard'
import { VStack, Box } from '@chakra-ui/react'
import { GameContainer, GameBoxScore } from 'components'

const index = () => {
    const { grade } = useGrade()
    const { league } = useLeague()
    const { season } = useSeason()
    const { game } = useGame()

    const router = useRouter()
    const isDesktop = useMediaQuerySSR(860)

    return (
        <Template>
            <VStack
                pos="absolute"
                top={isDesktop ? '50%' : '68%'}
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
                <GameContainer season={season} grade={grade} game={game} />
                <GameBoxScore game={game} />
            </VStack>
        </Template>
    )
}

export default index
