import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'
import BasketballIcon from 'components/icons/BasketballIcon'
import ActiveSeasonLabel from './ActiveSeasonLabel'
import { useMediaQuerySSR } from 'hooks'

const AssociationCard = ({ name, org, activeSeasons, icon }) => {
    const isDesktop = useMediaQuerySSR(1024)

    return isDesktop ? (
        <Box
            bg="white"
            w="100%"
            minW="300px"
            h="175px"
            borderRadius="0.75rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            pos="relative"
            boxShadow="0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);"
            px="2"
            cursor="pointer"
            transition="box-shadow 0.8s ease"
            _hover={{
                boxShadow: '0 15px 30px rgba(0,0,0,0.1), 0 20px 20px rgba(0,0,0,0.12);',
            }}
        >
            <Box pos="absolute" top="-25%">
                <Avatar src={icon} size="xl" bg="grey" />
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
    ) : (
        <Box
            bg="white"
            w="100%"
            minW="300px"
            h="125px"
            borderRadius="0.75rem"
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
            pos="relative"
            boxShadow="0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);"
            px="4"
            py="2"
            cursor="pointer"
            transition="box-shadow 0.8s ease"
            _hover={{
                boxShadow: '0 15px 30px rgba(0,0,0,0.1), 0 20px 20px rgba(0,0,0,0.12);',
            }}
        >
            <Box pos="absolute" bottom={3} right={3}>
                <Avatar src={icon} size="lg" bg="grey" />
            </Box>
            <Box textAlign="left" color="greyText" maxW="100%">
                <Text fontSize="1.125rem" fontWeight="bold">
                    {name}
                </Text>
                <Text fontSize="1rem">{org}</Text>
            </Box>
            <Box pos="absolute" bottom="3" left="3">
                <ActiveSeasonLabel activeSeasons={activeSeasons} />
            </Box>
        </Box>
    )
}

export default AssociationCard
