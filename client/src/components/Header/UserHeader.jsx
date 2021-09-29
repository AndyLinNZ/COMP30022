import { Box, Flex } from '@chakra-ui/react'
import CircleLogo from 'components/svg/CircleLogo'
import Logo from 'components/svg/Logo'
import { useMediaQuerySSR } from 'hooks'
import { useRouter } from 'next/router'
import React from 'react'
import { isLoggedIn } from 'utils'
import { appPaths } from 'utils/constants'
import HeaderDropdown from './HeaderDropdown'
import HomeHeader from './HomeHeader'

const UserHeader = ({ isHome = false }) => {
    const isDesktop = useMediaQuerySSR(1024)
    const router = useRouter()

    return isLoggedIn() ? (
        <Flex
            as="nav"
            w={isDesktop ? '78%' : '100%'}
            bg="transparent"
            fontSize="1.5rem"
            pos="absolute"
            left="50%"
            transform="translateX(-50%)"
            zIndex="dropdown"
        >
            {!isHome && (
                <Box
                    marginTop={['1rem', 0]}
                    marginLeft={['1rem', 0]}
                    cursor="pointer"
                    onClick={() => router.push(appPaths.HOME_PATH)}
                >
                    {isDesktop ? <Logo width="300" /> : <CircleLogo />}
                </Box>
            )}

            <Box pos="absolute" top="1rem" right="1rem" zIndex="dropdown">
                <HeaderDropdown />
            </Box>
        </Flex>
    ) : (
        <HomeHeader />
    )
}

export default UserHeader
