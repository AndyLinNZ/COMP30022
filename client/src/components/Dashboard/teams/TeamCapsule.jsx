import { EditIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import React from 'react'

const TeamCapsule = ({ team }) => {
    const { name } = team

    return (
        <Flex
            w="100%"
            h="70px"
            borderRadius="999px"
            border="2px solid grey"
            pos="relative"
            cursor="pointer"
            transition="box-shadow 0.8s ease"
            _hover={{
                boxShadow: '0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);',
            }}
        >
            <Text pos="absolute" top="50%" left="1.5rem" transform="translateY(-50%)">
                {name}
            </Text>
            <EditIcon
                fontSize="1.25rem"
                pos="absolute"
                top="50%"
                right="1.5rem"
                transform="translateY(-50%)"
            />
        </Flex>
    )
}

export default TeamCapsule
