import { Box, Flex, Button, HStack } from '@chakra-ui/react'
import CircleLogo from 'components/svg/CircleLogo'
import Logo from 'components/svg/Logo'
import { useMediaQuerySSR } from 'hooks'
import { useRouter } from 'next/router'
import React from 'react'
import { isLoggedIn } from 'utils'
import { appPaths } from 'utils/constants'
import HeaderDropdown from './HeaderDropdown'

const UserHeader = () => {
    const isDesktop = useMediaQuerySSR(1024)
    const router = useRouter()

    const [hideLogo, setHideLogo] = React.useState(false)

    // on first render
    React.useEffect(() => {
        setHideLogo(router.pathname === '/')
    }, [])

    const [userloggedIn, setUserloggedIn] = React.useState(false)

    React.useEffect(() => {
        setUserloggedIn(isLoggedIn())
    })

    return (
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
            {userloggedIn ? (
                <Box pos="absolute" top="1rem" right="1rem" zIndex="dropdown">
                    <HeaderDropdown />
                </Box>
            ) : (
                <HStack spacing="1.25rem" pos="absolute" top="1rem" right="1rem">
                    <Button
                        fontWeight="normal"
                        bg="white"
                        color="greyText.500"
                        px="6"
                        borderRadius="0.75rem"
                        transition="background 0.5s ease, color 0.5s ease"
                        _hover={{ bg: 'greyText.500', color: 'white' }}
                        onClick={() => router.push(appPaths.LOGIN_PATH)}
                    >
                        LOGIN
                    </Button>
                    {isDesktop && (
                        <Button
                            fontWeight="normal"
                            bg="greyText.500"
                            color="white"
                            px="6"
                            borderRadius="0.75rem"
                            transition="background 0.5s ease, color 0.5s ease"
                            _hover={{ color: 'greyText.500', bg: 'white' }}
                            onClick={() => router.push(appPaths.SIGN_UP_PATH)}
                        >
                            SIGNUP
                        </Button>
                    )}
                </HStack>
            )}
        </Flex>
    )
}

export default UserHeader
