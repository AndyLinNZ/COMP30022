import React from 'react'
import Head from 'next/head'
import { Flex, Box, Checkbox, Text, Spinner } from '@chakra-ui/react'
import HeroBackDrop from 'components/svg/HeroBackDrop'
import HeroBackDropMobile from 'components/svg/HeroBackDropMobile'
import AssociationSearch from 'components/AssociationPage/AssociationSearch'
import AssociationGrid from 'components/AssociationPage/AssociationGrid'
import Logo from 'components/svg/Logo'
import { useLeagues, useMediaQuerySSR } from 'hooks'
import Footer from 'components/Footer'
import UserHeader from 'components/Header/UserHeader'

export default function Home() {
    const [inSeason, setInSeason] = React.useState(true)
    const [upcomingSeason, setUpcomingSeason] = React.useState(true)
    const [searchValue, setSearchValue] = React.useState('')
    const isDesktop = useMediaQuerySSR(940)
    const { leagues, isLoading } = useLeagues()

    const [filteredLeagues, setFilteredLeagues] = React.useState([])

    // filter leagues based on search term
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
            <UserHeader />
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
                <Flex alignItems="center" width="100%" mt={['2rem', '5rem']} pos="relative">
                    {isLoading ? (
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                            position="absolute"
                            top="50%"
                            left="calc(50% - 1rem)"
                        />
                    ) : (
                        <AssociationGrid
                            {...{ inSeason, upcomingSeason, leagues: filteredLeagues }}
                        />
                    )}
                </Flex>
            </Box>
            <Box w="100%">
                <Footer />
            </Box>
        </Flex>
    )
}
