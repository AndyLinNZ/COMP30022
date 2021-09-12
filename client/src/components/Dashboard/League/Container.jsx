import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Stepper } from '.'

const Container = ({ league, children, minH = '375px', w = ['95%', '75%'] }) => {
    return (
        <VStack pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" w={w}>
            <VStack spacing="0.25rem" alignSelf="flex-start">
                <Text fontSize="3rem">{league?.name}</Text>
                <Box
                    alignSelf="flex-start"
                    bg="greyBg"
                    color="white"
                    px="0.5rem"
                    borderRadius="5px"
                >
                    {league?.organisation}
                </Box>
            </VStack>
            <Stepper />
            <Box
                h="100%"
                w="100%"
                bg="white"
                borderRadius="1rem"
                boxShadow="0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);"
                padding="1rem"
                minH={minH}
                overflowY="scroll"
            >
                {children}
            </Box>
        </VStack>
    )
}

export default Container
