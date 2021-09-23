import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Flex, Box, Text, Button } from '@chakra-ui/react'
import { useMediaQuerySSR } from 'hooks'
import { appPaths } from 'utils/constants'
import Logo from 'components/svg/Logo'
import HeroBackDrop from 'components/svg/HeroBackDrop'
import HeroBackDropMobile from 'components/svg/HeroBackDropMobile'

function NotFound() {
    const router = useRouter()
    const isDesktop = useMediaQuerySSR(940)

    return (
        <Flex maxW="100vw" h="100vh" flexDir="column" justifyContent="flex-start" bg="grey" overflow="hidden">
            <Head>
                <title> Dribblr | 404 </title>
            </Head>
            {isDesktop ? <HeroBackDrop /> : <HeroBackDropMobile />}
            <Flex
                pos="absolute"
                left="50%"
                transform="translateX(-50%)"
                mt="60px"
                flexDir="column"
                w="100%"
            >
                <Box display="flex" justifyContent="center" w="100%" mb="4">
                    <Logo />
                </Box>
                <Box display="flex" justifyContent="center" w="100%" mb="4">
                    <Text fontSize="2rem">Page not found</Text>
                </Box>
                <Box display="flex" justifyContent="center" w="100%" mb="4">
                    <Button
                        fontWeight="normal"
                        bg="white"
                        color="greyText.500"
                        px="6"
                        mr={[-2, 4, 4]}
                        borderRadius="0.75rem"
                        transition="background 0.5s ease, color 0.5s ease"
                        _hover={{ bg: 'greyText.500', color: 'white' }}
                        onClick={() => router.push(appPaths.HOME_PATH)}
                    >
                        Go Home
                    </Button>
                </Box>
            </Flex>
        </Flex>
    )
}

export default NotFound
