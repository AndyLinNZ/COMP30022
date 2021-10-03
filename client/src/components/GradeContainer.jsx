import { Flex, HStack, Text, Box, VStack } from '@chakra-ui/react'
import { useMediaQuerySSR } from 'hooks'
import { useRouter } from 'next/router'
import React from 'react'

const GradeContainer = ({ grade, path }) => {
    const router = useRouter()
    const isDesktop = useMediaQuerySSR(860)
    const { name, difficulty, gender, teams, fixture } = grade
    return isDesktop ? (
        <Flex
            w="100%"
            h="70px"
            borderRadius="1rem"
            border="2px solid grey"
            pos="relative"
            cursor="pointer"
            transition="box-shadow 0.8s ease"
            _hover={{
                boxShadow: '0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);',
            }}
            onClick={() => router.push(window.location.pathname + `/${path}/rounds`)}
            paddingX="1rem"
        >
            <Box
                fontSize="1.25rem"
                w="100%"
                display="grid"
                gridTemplateColumns="1fr 0.6fr"
                alignItems="center"
            >
                <Text>
                    {name} ({gender} {difficulty})
                </Text>

                <HStack justifyContent="flex-end">
                    <Box
                        p="0.25rem 1rem"
                        fontSize={['0.875rem', '1rem']}
                        bg="darkGrey"
                        color="greyText"
                    >
                        {fixture.length + ' ROUND(S) ADDED'}
                    </Box>
                    <Box
                        p="0.25rem 1rem"
                        fontSize={['0.875rem', '1rem']}
                        bg="greyText.500"
                        color="white"
                    >
                        {teams.length + ' TEAM(S) ASSIGNED'}
                    </Box>
                </HStack>
            </Box>
        </Flex>
    ) : (
        <Flex
            w="100%"
            borderRadius="1rem"
            border="2px solid grey"
            pos="relative"
            cursor="pointer"
            transition="box-shadow 0.8s ease"
            _hover={{
                boxShadow: '0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);',
            }}
            onClick={() => router.push(window.location.pathname + `/${path}/grades`)}
            padding="1rem"
            flexDir="column"
        >
            <VStack fontSize="1.25rem" w="100%" alignItems="flex-start" spacing={0}>
                <Text>{name}</Text>
                <HStack>
                    <Box
                        p="0.25rem 1rem"
                        fontSize={['0.875rem', '1rem']}
                        bg="darkGrey"
                        color="greyText"
                    >
                        {fixture.length + ' ROUND(S) ADDED'}
                    </Box>
                    <Box
                        p="0.25rem 1rem"
                        fontSize={['0.875rem', '1rem']}
                        bg="greyText.500"
                        color="white"
                    >
                        {teams.length + ' TEAM(S) ASSIGNED'}
                    </Box>
                </HStack>
            </VStack>
        </Flex>
    )
}

export default GradeContainer
