import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

const types = {
    add: {
        buttonContainer: {
            bg: 'greyBg',
            _hover: { boxShadow: '0 0 0 1px grey' },
        },
        icon: <AddIcon color="white" fontSize="1.5rem" />,
    },
    delete: {
        buttonContainer: {
            bg: 'red',
            _hover: { boxShadow: '0 0 0 1px #e78267' },
        },
        icon: <MinusIcon color="white" fontSize="1.5rem" />,
    },
}
const TeamCapsule = ({ name, type = 'add', onClick }) => {
    return (
        <Flex
            w="100%"
            h="60px"
            padding="8px 2px"
            borderRadius="999px"
            border="2px solid grey"
            pos="relative"
            cursor="pointer"
            alignItems="center"
        >
            <Text pos="absolute" left="1rem">
                {name}
            </Text>
            <Flex
                pos="absolute"
                right="0.5rem"
                borderRadius="50%"
                w="40px"
                h="40px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={onClick}
                transition="box-shadow 0.3s ease"
                {...types[type].buttonContainer}
            >
                {types[type].icon}
            </Flex>
        </Flex>
    )
}

export default TeamCapsule
