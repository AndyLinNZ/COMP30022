import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
    return (
        <Flex
            as="nav"
            w="100%"
            bg="transparent"
            fontSize="1.5rem"
            justifyContent="flex-end"
            pos="absolute"
            top="4"
            right="8"
        >
            <Box>
                <Button
                    fontWeight="normal"
                    bg="white"
                    color="greyText.500"
                    px="6"
                    mr="4"
                    borderRadius="0.75rem"
                    transition="background 0.5s ease, color 0.5s ease"
                    _hover={{ bg: 'greyText.500', color: 'white' }}
                >
                    LOGIN
                </Button>
                <Button
                    fontWeight="normal"
                    bg="greyText.500"
                    color="white"
                    px="6"
                    borderRadius="0.75rem"
                    transition="background 0.5s ease, color 0.5s ease"
                    _hover={{ color: 'greyText.500', bg: 'white' }}
                >
                    SIGNUP
                </Button>
            </Box>
        </Flex>
    )
}

export default Header
