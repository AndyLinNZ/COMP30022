import { EditIcon } from '@chakra-ui/icons'
import { Flex, HStack, Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { getHumanReadableDate } from 'utils'

const InfoContainer = ({ season, path }) => {
    const router = useRouter()
    const { name, dateStart, dateFinish } = season
    console.log(getHumanReadableDate(dateStart))
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
            >
                <HStack fontSize="1.25rem">
                    <Text>{name}</Text>
                    <HStack>
                        <Text>{getHumanReadableDate(dateStart)}</Text>
                        <Box>-</Box>
                        <Text>{getHumanReadableDate(dateFinish)}</Text>
                    </HStack>
                </HStack>

                <EditIcon
                    fontSize="1.25rem"
                    pos="absolute"
                    top="50%"
                    right="1.5rem"
                    transform="translateY(-50%)"
                />
            </Flex>
        </HStack>
    )
}

export default InfoContainer
