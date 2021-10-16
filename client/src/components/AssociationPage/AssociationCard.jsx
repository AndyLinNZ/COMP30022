import { Avatar, Box, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import BasketballIcon from 'components/svg/BasketballIcon'
import ActiveSeasonLabel from './ActiveSeasonLabel'
import { useMediaQuerySSR } from 'hooks'
import { useRouter } from 'next/router'
import { appPaths } from 'utils/constants'
import { EmailIcon } from '@chakra-ui/icons'
import BasketBallAvatar from 'components/svg/BasketBallAvatar'

const AssociationCard = ({ name, org, activeSeasons, id, creator }) => {
    const isDesktop = useMediaQuerySSR(1024)
    const router = useRouter()

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
            onClick={() =>
                router.push(`${appPaths.LEAGUE_PATH}/${id}/seasons
            `)
            }
        >
            <Box pos="absolute" top="-25%">
                <Avatar icon={<BasketBallAvatar />} size="xl" bg="grey" />
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
            <Box pos="absolute" top="1" left="2">
                <Tooltip label={creator.email} fontSize="sm" placement="top" bg="greyBg">
                    <EmailIcon fontSize="1.5rem" color="greyBg" />
                </Tooltip>
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
            onClick={() =>
                router.push(`${appPaths.LEAGUE_PATH}/${id}/seasons
            `)
            }
        >
            <Box pos="absolute" bottom={3} right={3}>
                <Avatar icon={<BasketBallAvatar size={60} />} size="lg" bg="grey" />
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
