import { Flex, HStack, Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { getHumanReadableDate } from 'utils'
import { Status } from '.'

const InfoContainer = ({ season, path }) => {
    const router = useRouter()
    const { name, dateStart, dateFinish, status } = season
    return (
        <HStack w="100%">
            <Flex
                w="90%"
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
                        <Text>{getHumanReadableDate(dateStart)}</Text>
                        <Box>-</Box>
                        <Text>{getHumanReadableDate(dateFinish)}</Text>
                    </HStack>
                    <Box justifySelf="flex-end">
                        <Status status={status} />
                    </Box>
                </Box>
            </Flex>
        </HStack>
    )
}

export default InfoContainer
