import React from 'react'
import { Flex, Box, Checkbox, Text } from '@chakra-ui/react'
import { useMediaQuerySSR } from 'hooks'
import DashboardBackDrop from 'components/svg/DashboardBackDrop'
import HeroBackDropMobile from 'components/svg/HeroBackDropMobile'
import UserHeader from 'components/Header/UserHeader'

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
            {isDesktop ? (
                <DashboardBackDrop />
            ) : (
                <>
                    <HeroBackDropMobile />
                </>
            )}

            <UserHeader />
            {children}
        </Flex>
    )
}

export default Template
