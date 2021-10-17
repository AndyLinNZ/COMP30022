import { Box, Button, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import FooterBg from 'components/svg/FooterBg'
import FooterBgMobile from 'components/svg/FooterBgMobile'
import LogoWhite from 'components/svg/LogoWhite'
import { useMediaQuerySSR } from 'hooks'
import { useRouter } from 'next/router'
import { isLoggedIn } from 'utils'
import { appPaths } from 'utils/constants'

const Footer = () => {
    const isDesktop = useMediaQuerySSR(900)
    const router = useRouter()

    return (
        <Box w="100%" pos="relative">
            {isDesktop ? (
                <>
                    <Flex
                        pos="absolute"
                        bottom="40%"
                        transform="translateY(40%)"
                        left="10%"
                        flexDir="column"
                        alignItems="center"
                    >
                        <LogoWhite />
                        {!isLoggedIn() && (
                            <Box mt={4}>
                                <Button
                                    fontWeight="normal"
                                    bg="white"
                                    color="greyText.500"
                                    px="6"
                                    mr={4}
                                    borderRadius="0.75rem"
                                    transition="background 0.5s ease, color 0.5s ease"
                                    _hover={{ bg: 'greyText.500', color: 'white' }}
                                    onClick={() => router.push(appPaths.LOGIN_PATH)}
                                >
                                    LOGIN
                                </Button>

                                <Button
                                    fontWeight="normal"
                                    bg="black.500"
                                    color="white"
                                    px="6"
                                    borderRadius="0.75rem"
                                    transition="background 0.5s ease, color 0.5s ease"
                                    _hover={{ color: 'black.500', bg: 'white' }}
                                    onClick={() => router.push(appPaths.SIGN_UP_PATH)}
                                >
                                    SIGNUP
                                </Button>
                            </Box>
                        )}
                    </Flex>
                    <Flex
                        flexDir="column"
                        color="white"
                        pos="absolute"
                        bottom="40%"
                        left="60%"
                        transform="translate(-60%, 40%)"
                    >
                        <Link mb={2} onClick={() => router.push(appPaths.ABOUT_PATH)}>
                            About
                        </Link>
                        <Link onClick={() => router.push(appPaths.CONTACT_PATH)}>Contact Us</Link>
                    </Flex>
                    <FooterBg />
                </>
            ) : (
                <>
                    <Flex
                        flexDir="column"
                        pos="absolute"
                        bottom="50%"
                        left="50%"
                        transform="translate(-50%, 50%)"
                        alignItems="center"
                    >
                        <LogoWhite />
                        {!isLoggedIn() && (
                            <Box mt={4}>
                                <Button
                                    fontWeight="normal"
                                    bg="white"
                                    color="greyText.500"
                                    px="6"
                                    mr={4}
                                    borderRadius="0.75rem"
                                    transition="background 0.5s ease, color 0.5s ease"
                                    _hover={{ bg: 'greyText.500', color: 'white' }}
                                    onClick={() => router.push(appPaths.LOGIN_PATH)}
                                >
                                    LOGIN
                                </Button>

                                <Button
                                    fontWeight="normal"
                                    bg="black.500"
                                    color="white"
                                    px="6"
                                    borderRadius="0.75rem"
                                    transition="background 0.5s ease, color 0.5s ease"
                                    _hover={{ color: 'black.500', bg: 'white' }}
                                    onClick={() => router.push(appPaths.SIGN_UP_PATH)}
                                >
                                    SIGNUP
                                </Button>
                            </Box>
                        )}
                        <Flex color="white" mt={8}>
                            <Link mb={2} onClick={() => router.push(appPaths.ABOUT_PATH)}>
                                About
                            </Link>
                            <Link onClick={() => router.push(appPaths.CONTACT_PATH)}>
                                Contact Us
                            </Link>
                        </Flex>
                    </Flex>
                    <FooterBgMobile />
                </>
            )}
        </Box>
    )
}

export default Footer
