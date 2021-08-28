import React from 'react'
import { Flex, Box, Checkbox, Text } from '@chakra-ui/react'
import { useMediaQuerySSR } from 'hooks'
import DashboardBackDrop from 'components/svg/DashboardBackDrop'

const Template = ({ children }) => {
    const isDesktop = useMediaQuerySSR(940)

    return (
        <Flex
            maxW="100vw"
            h="100vh"
            flexDir="column"
            justifyContent="flex-start"
            bg="grey"
            overflow="hidden"
        >
            <DashboardBackDrop />
            {children}
        </Flex>
    )
}

export default Template
