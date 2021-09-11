import { Box, Flex } from '@chakra-ui/react'
import CircleLogo from 'components/svg/CircleLogo'
import Logo from 'components/svg/Logo'
import { useMediaQuerySSR } from 'hooks'
import { useRouter } from 'next/router'
import React from 'react'
import { appPaths } from 'utils/constants'
import HeaderDropdown from './HeaderDropdown'

const UserHeader = ({ isHome = false }) => {
    const isDesktop = useMediaQuerySSR(1024)
    const router = useRouter()

    return (
        <Flex
            as="nav"
            w={['100%', '78%']}
            bg="transparent"
            fontSize="1.5rem"
            justifyContent="flex-end"
            pos="absolute"
            left="50%"
            transform="translateX(-50%)"
            zIndex="dropdown"
        >
            {!isHome && (
                <Box
                    pos="absolute"
                    left="1rem"
                    top={['1rem', 0]}
                    cursor="pointer"
                    onClick={() => router.push(appPaths.HOME_PATH)}
                >
                    {isDesktop ? <Logo width="300" /> : <CircleLogo />}
                </Box>
            )}

            <Box pos="relative" top="1rem" right="1rem" zIndex="dropdown">
                <HeaderDropdown />
            </Box>
        </Flex>
    )
}

export default UserHeader
