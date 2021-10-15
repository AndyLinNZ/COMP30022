import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { appPaths } from 'utils/constants'

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
const TeamCapsule = ({ name, id, type = 'add', onClick }) => {
    const teamLink = `${appPaths.DASHBOARD_TEAMS_PATH}/${id}/games`

    return (
        <Flex
            w="100%"
            h="60px"
            padding="8px 2px"
            borderRadius="999px"
            border="2px solid grey"
            pos="relative"
            alignItems="center"
        >
            <Box
                fontSize="16px"
                pos="absolute"
                left="1rem"
                _hover={{
                    cursor: 'pointer',
                    color: 'lightGray',
                }}
            >
                <a href={teamLink} target="_blank" rel="noreferrer">
                    {name}
                </a>
            </Box>
            <Flex
                cursor="pointer"
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
