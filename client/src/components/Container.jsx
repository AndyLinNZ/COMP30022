import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { Stepper } from './Dashboard/League'
import { appPaths } from 'utils/constants'
import { isBrowser } from 'utils'

const Container = ({ league, children, minH = '375px', w = ['95%', '75%'], stepperLoc }) => {
    const onDashBoard = isBrowser() && window.location.pathname.includes('dashboard')
    const leagueLink = `${onDashBoard ? appPaths.DASHBOARD_LEAGUES_PATH : appPaths.LEAGUE_PATH}/${
        league?._id
    }/seasons`

    return (
        <VStack
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w={w}
            spacing="0.75rem"
        >
            <VStack spacing="0.25rem" alignSelf="flex-start">
                <Box fontSize="3rem" lineHeight="1" _hover={{ color: 'white' }}>
                    <a href={leagueLink}>{league?.name}</a>
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
            <Stepper stepperLoc={stepperLoc} />
            <Box
                h="100%"
                w="100%"
                bg="white"
                borderRadius="1rem"
                boxShadow="0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);"
                padding="1rem"
                minH={minH}
                maxH="390px"
                overflowY="auto"
                pos="relative"
            >
                {children}
            </Box>
        </VStack>
    )
}

export default Container
