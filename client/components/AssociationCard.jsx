import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'
import BasketballIcon from 'components/icons/BasketballIcon'
import ActiveSeasonLabel from './ActiveSeasonLabel'

const AssociationCard = ({ name, org, activeSeasons, icon }) => {
    return (
        <Box
            bg="white"
            w="350px"
            h="175px"
            borderRadius="0.75rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            pos="relative"
            boxShadow="0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);"
            px="2"
        >
            <Box pos="absolute" top="-25%">
                <Avatar src={icon} size="xl" />
            </Box>
            <Box textAlign="center" color="greyText" mt="1rem" maxW="100%">
                <Text fontSize="1.125rem">{name}</Text>
                <Text fontSize="1rem">{org}</Text>
            </Box>
            <Box pos="absolute" bottom="3" left="3">
                <ActiveSeasonLabel activeSeasons={activeSeasons} />
            </Box>
            <Box pos="absolute" bottom="2" right="2">
                <BasketballIcon />
            </Box>
        </Box>
    )
}

export default AssociationCard
