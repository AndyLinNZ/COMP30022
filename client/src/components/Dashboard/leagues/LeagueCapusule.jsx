import { EditIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { appPaths } from 'utils/constants'

const LeagueCapsule = ({ league }) => {
    const router = useRouter()

    const { name, _id: leagueId } = league
    console.log(league)

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
            onClick={() => router.push(`${appPaths.DASHBOARD_LEAGUES_PATH}/${leagueId}`)}
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

export default LeagueCapsule
