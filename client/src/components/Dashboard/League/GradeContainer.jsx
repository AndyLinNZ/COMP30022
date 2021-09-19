import { Flex, HStack, Text, Box, VStack } from '@chakra-ui/react'
import { useMediaQuerySSR } from 'hooks'
import { useRouter } from 'next/router'
import React from 'react'
import { Status } from '.'

const GradeContainer = ({ grade, path }) => {
    const router = useRouter()
    const isDesktop = useMediaQuerySSR(860)
    const { name, teams, fixture } = grade
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
            onClick={() => router.push(window.location.pathname + `/${path}`)}
            paddingX="1rem"
        >
            <Box
                fontSize="1.25rem"
                w="100%"
                display="grid"
                gridTemplateColumns="1fr 1fr 1fr"
                alignItems="center"
            >
                <Text>{name}</Text>

                <HStack>
                    <Box p="0.25rem 1rem" fontSize={['0.875rem', '1rem']} bg="#D5D5D5" color="greyText">
                        {fixture.length + " ROUND(S) ADDED"}
                    </Box>
                    <Box p="0.25rem 1rem" fontSize={['0.875rem', '1rem']} bg="black">
                        {teams.length + " TEAM(S) ASSIGNED"}
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
                    <Box p="0.25rem 1rem" fontSize={['0.875rem', '1rem']} bg="#D5D5D5" color="greyText">
                        {fixture.length + " ROUND(S) ADDED"}
                    </Box>
                    <Box p="0.25rem 1rem" fontSize={['0.875rem', '1rem']} bg="black">
                        {teams.length + " TEAM(S) ASSIGNED"}
                    </Box>
                </HStack>
            </VStack>
            <Box alignSelf="center" marginTop="0.5rem">
                <Status status={status} />
            </Box>
        </Flex>
    )
}

export default GradeContainer