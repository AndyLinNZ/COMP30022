import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Flex, Box, VStack, Text, Button } from '@chakra-ui/react'
import { useMediaQuerySSR } from 'hooks'
import { appPaths } from 'utils/constants'
import HeroBackDrop from 'components/svg/HeroBackDrop'
import HeroBackDropMobile from 'components/svg/HeroBackDropMobile'
import UserHeader from 'components/Header/UserHeader'

const aboutUs = {
    whoIsItFor:
        'Dribblr is a cohesive platform for league personnel, team managers, basketball players or just casual fans.',
    whatIsIt:
        'Step by step management of Leagues, Seasons, Grades, Fixtures and matches through a seamless system for admins.',
}

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
                <VStack
                    h="100%"
                    w="100%"
                    bg="white"
                    borderRadius="1rem"
                    spacing="2rem"
                    boxShadow="0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);"
                    padding="1rem"
                    minH="375px"
                    alignItems="left"
                >
                    <Text textAlign="center" fontSize="2.5rem" px="4">
                        Welcome to Dribblr!
                    </Text>
                    <Box>
                        <Text fontSize="2rem">Who is it for?</Text>
                        <Text fontSize="1.25rem">{aboutUs.whoIsItFor}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="2rem">What is it?</Text>
                        <Text fontSize="1.25rem">{aboutUs.whatIsIt}</Text>
                    </Box>
                </VStack>
            </VStack>
        </Flex>
    )
}

export default index
