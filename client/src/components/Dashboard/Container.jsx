import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Container = ({ heading, children, minH = '375px', w = ['95%', '75%'], ...props }) => {
    return (
        <Flex
            flexDir="column"
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w={w}
        >
            <Text fontSize="2rem">{heading}</Text>
            <Box
                h="100%"
                w="100%"
                bg="white"
                borderRadius="1rem"
                boxShadow="0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);"
                padding="1rem"
                minH={minH}
                {...props}
            >
                {children}
            </Box>
        </Flex>
    )
}

export default Container
