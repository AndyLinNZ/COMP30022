import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import { Flex, Box, Textarea, Button, VStack, FormLabel, useToast } from '@chakra-ui/react'
import { Input, FormButton } from 'components/Form'
import { useMediaQuerySSR } from 'hooks'
import { appPaths } from 'utils/constants'
import HeroBackDrop from 'components/svg/HeroBackDrop'
import HeroBackDropMobile from 'components/svg/HeroBackDropMobile'
import UserHeader from 'components/Header/UserHeader'

const index = ({ w = ['95%', '75%'] }) => {
    const router = useRouter()
    const isDesktop = useMediaQuerySSR(940)

    return (
        <Flex
            maxW="100vw"
            h="100vh"
            flexDir="column"
            justifyContent="flex-start"
            bg="grey"
            overflow="hidden"
        >
            <Head>
                <title> Dribblr | About Us </title>
            </Head>
            {isDesktop ? <HeroBackDrop /> : <HeroBackDropMobile />}
            <UserHeader />
            <VStack
                pos="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w={w}
                spacing="0.75rem"
            >
                <VStack spacing="0.25rem" alignSelf="flex-start">
                    <Box fontSize="3rem" lineHeight="1">
                        ABOUT US
                    </Box>
                    <Button
                        alignSelf="flex-start"
                        fontWeight="normal"
                        color="white"
                        bg="greyText.500"
                        px="4"
                        borderRadius="0.75rem"
                        transition="background 0.5s ease, color 0.5s ease"
                        _hover={{ color: 'greyText.500', bg: 'white' }}
                        onClick={() => router.push(appPaths.HOME_PATH)}
                    >
                        GO BACK HOME
                    </Button>
                </VStack>
                <Box
                    h="100%"
                    w="100%"
                    bg="white"
                    borderRadius="1rem"
                    boxShadow="0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);"
                    padding="1rem"
                    minH="375px"
                >
                    <Text>Dribblr is shit</Text>
                </Box>
            </VStack>
        </Flex>
    )
}

export default index
