import { EditIcon } from '@chakra-ui/icons'
import { Flex, Box, VStack, IconButton, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

import Tag from 'components/Dashboard/Tag'

const Capsule = ({ name, subtext, path, tags }) => {
    const router = useRouter()
    return (
        <Flex
            w="100%"
            h="70px"
            borderRadius="999px"
            border="2px solid grey"
            pos="relative"
            cursor="pointer"
            transition="box-shadow 0.8s ease"
            alignItems="center"
            _hover={{
                boxShadow: '0 5px 10px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.12);',
            }}
            onClick={() => router.push(window.location.pathname + `/${path}`)}
        >
            <VStack ml="1.5rem" alignItems="start">
                <Text fontWeight="bold">
                    {name}
                </Text>
                {subtext ?
                    <Text fontSize="xs" mt="0 !important">
                        {subtext}
                    </Text>
                : null}
            </VStack>
            <Flex position="absolute" right="4rem" gridGap="14px">
                {tags?.map(([type, text]) => <Tag id={type} type={type} text={text}/>)}
            </Flex>
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

export default Capsule
