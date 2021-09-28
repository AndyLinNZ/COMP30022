import React from 'react'
import Head from 'next/head'
import { Flex, Box, Checkbox, Text } from '@chakra-ui/react'
import HomeHeader from 'components/Header/HomeHeader'
import HeroBackDrop from 'components/svg/HeroBackDrop'
import HeroBackDropMobile from 'components/svg/HeroBackDropMobile'
import AssociationSearch from 'components/AssociationPage/AssociationSearch'
import AssociationGrid from 'components/AssociationPage/AssociationGrid'
import Logo from 'components/svg/Logo'
import { useLeagues, useMediaQuerySSR } from 'hooks'
import Footer from 'components/Footer'
import { isLoggedIn } from 'utils'
import UserHeader from 'components/Header/UserHeader'

export default function Home() {
    const [inSeason, setInSeason] = React.useState(true)
    const [upcomingSeason, setUpcomingSeason] = React.useState(true)
    const [searchValue, setSearchValue] = React.useState('')
    const isDesktop = useMediaQuerySSR(940)
    const { leagues } = useLeagues()

    const [filteredLeagues, setFilteredLeagues] = React.useState([])

    React.useEffect(() => {
        setFilteredLeagues(
            leagues?.filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase())) ||
                []
        )
    }, [searchValue, leagues])

    return (
        <Flex maxW="100vw" flexDir="column" justifyContent="flex-start" bg="grey" overflow="hidden">
            <Head>
                <title>Dribblr | Basketball Leagues</title>
            </Head>
            {isDesktop ? (
                <HeroBackDrop />
            ) : (
                <>
                    <HeroBackDropMobile />
                </>
            )}
            {isLoggedIn() ? <UserHeader isHome /> : <HomeHeader />}
            <Flex
                pos="absolute"
                left="50%"
                transform="translateX(-50%)"
                mt="60px"
                flexDir="column"
                w="100%"
            >
                <Box display="flex" justifyContent="center" w="100%" mb="4">
                    <Logo />
                </Box>

                <AssociationSearch value={searchValue} onChange={setSearchValue} />
            </Flex>
            <Box px={['3rem', '10rem']} minH="500px" mt={[6, 2]} mb="5rem">
                <Flex>
                    <Checkbox
                        isChecked={inSeason}
                        onChange={(e) => {
                            e.preventDefault()
                            setInSeason(!inSeason)
                        }}
                        iconColor="white"
                        colorScheme="greyText"
                        size="lg"
                        mr="4"
                    >
                        <Text fontSize="1rem">IN SEASON</Text>
                    </Checkbox>
                    <Checkbox
                        isChecked={upcomingSeason}
                        onChange={(e) => {
                            e.preventDefault()
                            setUpcomingSeason(!upcomingSeason)
                        }}
                        iconColor="white"
                        colorScheme="greyText"
                        size="lg"
                    >
                        <Text fontSize="1rem">SEASON UPCOMING</Text>
                    </Checkbox>
                </Flex>
                <Flex alignItems="center" width="100%" mt={['2rem', '5rem']}>
                    <AssociationGrid {...{ inSeason, upcomingSeason, leagues: filteredLeagues }} />
                </Flex>
            </Box>
            <Box w="100%">
                <Footer />
            </Box>
        </Flex>
    )
}
