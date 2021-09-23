import { Flex, Box, VStack, IconButton, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMediaQuerySSR } from 'hooks'
import React from 'react'

import Tag from 'components/Dashboard/Tag'

const Capsule = ({ name, subtext, path, tags }) => {
    const router = useRouter()
    const isDesktop = useMediaQuerySSR(940)

    return (
        <Flex
            w="100%"
            h={isDesktop ? "70px" : "100%"}
            padding={isDesktop ? "" : "8px 2px"}
            borderRadius={isDesktop ? "999px" : "24px"}
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
                <Text fontWeight="bold">{name}</Text>
                {subtext && (
                    <>
                        <Text fontSize="xs" mt="0 !important">
                            {subtext}
                        </Text>
                    </>
                )}
                {!isDesktop && (
                    <>
                        <Flex gridGap="4px" flexWrap="wrap">
                            {tags?.map(([type, text]) => (
                                <Tag key={type} type={type} text={text} />
                            ))}
                        </Flex>
                    </>
                )}
            </VStack>
            {isDesktop && (
                <>
                    <Flex position="absolute" right="4rem" gridGap="14px">
                        {tags?.map(([type, text]) => (
                            <Tag key={type} type={type} text={text} />
                        ))}
                    </Flex>
                </>
            )}
        </Flex>
    )
}

export default Capsule
