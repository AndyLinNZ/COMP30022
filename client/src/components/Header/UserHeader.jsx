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

const UserHeader = () => {
    const isDesktop = useMediaQuerySSR(1024)
    const router = useRouter()
    const [hideLogo, setHideLogo] = React.useState(false)

    React.useEffect(() => {
        setHideLogo(router.pathname === '/')
    }, [])

    const [userloggedIn, setUserloggedIn] = React.useState(false)

    React.useEffect(() => {
        setUserloggedIn(isLoggedIn())
    })

    return userloggedIn ? (
        <Flex
            as="nav"
            w={isDesktop ? '78%' : '100%'}
            h="40px"
            bg="transparent"
            fontSize="1.5rem"
            pos="absolute"
            left="50%"
            transform="translateX(-50%)"
            top="0"
            zIndex="dropdown"
        >
            <Box
                marginTop={['1rem', 0]}
                marginLeft={['1rem', 0]}
                cursor="pointer"
                onClick={() => router.push(appPaths.HOME_PATH)}
                visibility={hideLogo ? 'hidden' : undefined}
            >
                {isDesktop ? (
                    <Logo width="300" cursor="pointer" />
                ) : (
                    <CircleLogo cursor="pointer" />
                )}
            </Box>

            <Box pos="absolute" top="1rem" right="1rem" zIndex="dropdown">
                <HeaderDropdown />
            </Box>
        </Flex>
    ) : (
        <HomeHeader />
    )
}

export default UserHeader
