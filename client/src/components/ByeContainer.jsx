import { Flex, VStack, Text, Divider, Grid, HStack } from '@chakra-ui/react'
import { useMediaQuerySSR } from 'hooks'
import { useRouter } from 'next/router'
import Tag from 'components/Dashboard/Tag'
import React from 'react'

const ByeContainer = ({ team }) => {
    const router = useRouter()
    const isDesktop = useMediaQuerySSR(860)
    const { name } = team
    return isDesktop ? (
        <Flex
            w="100%"
            h="100px"
            borderRadius="1rem"
            border="2px solid grey"
            pos="relative"
            cursor="pointer"
            transition="box-shadow 0.8s ease"
            _hover={{
                boxShadow: '0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);',
            }}
            onClick={() => {}}
            paddingX="1rem"
        >
            <Grid templateColumns="3fr 2fr 2fr 2fr 3fr 0.5rem 6fr" gridGap="1rem" alignItems="center" w="100%">
                <Text fontWeight="bold" fontSize="lg">
                    {name}
                </Text>
                <div></div>
                <Tag type="players" text="bye" />
            </Grid>
        </Flex>
    ) : 
        <Flex
            w="100%"
            h="100px"
            borderRadius="1rem"
            border="2px solid grey"
            pos="relative"
            cursor="pointer"
            transition="box-shadow 0.8s ease"
            _hover={{
                boxShadow: '0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);',
            }}
            onClick={() => {}}
            paddingX="1rem"
        >
            <HStack w="100%" spacing="50%">
                <Text fontWeight="bold" fontSize="sm">
                    {name}
                </Text>
                <Tag type="players" text="bye" />
            </HStack>
        </Flex>
}

export default ByeContainer
