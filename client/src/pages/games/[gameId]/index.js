import React from 'react'
import { useGame, useMediaQuerySSR } from 'hooks'
import { getLeague, getSeason, getGrade } from 'api'
import { extractData } from 'utils'
import { Template } from 'components/Dashboard'
import { VStack, Box } from '@chakra-ui/react'
import { GameContainer, GameBoxScore } from 'components'

const index = () => {
    const [league, setLeague] = React.useState()
    const [season, setSeason] = React.useState()
    const [grade, setGrade] = React.useState()

    const { game } = useGame()

    const isDesktop = useMediaQuerySSR(860)

    /**
     * This hook uses the game object from a useQuery hook to fetch the appropriate
     * league, season and grade
     */
    React.useEffect(() => {
        if (game) {
            getLeague({ queryKey: [null, game?.paths.leagueId] }).then(data => {
                setLeague(extractData(data))
            })
            getSeason({ queryKey: [null, game?.paths.seasonId] }).then(data => {
                setSeason(extractData(data))
            })
            getGrade({ queryKey: [null, game?.paths.gradeId] }).then(data => {
                setGrade(extractData(data))
            })
        }
    }, [game])

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
