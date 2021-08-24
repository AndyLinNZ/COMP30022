import React from 'react'
import Head from 'next/head'
import { Flex, Box, Checkbox, Text } from '@chakra-ui/react'
import Header from 'components/Header'
import HeroBackDrop from 'components/svg/HeroBackDrop'
import HeroBackDropMobile from 'components/svg/HeroBackDropMobile'
import AssociationSearch from 'components/AssociationPage/AssociationSearch'
import AssociationGrid from 'components/AssociationPage/AssociationGrid'
import Logo from 'components/svg/Logo'
import { useMediaQuerySSR } from 'hooks'
import Footer from 'components/Footer'

const mockTeams = [
    {
        name: 'National Basketball Association',
        org: 'Basketball Victoria',
        activeSeasons: 2,
        _id: 0,
    },
    {
        name: 'National Orange Association',
        org: 'Basketball Victoria',
        activeSeasons: 1,
        _id: 1,
    },
    {
        name: 'National Basketball Players',
        org: 'Basketball Victoria',
        activeSeasons: 0,
        _id: 2,
    },
    {
        name: 'Okay Basketball Association',
        org: 'Basketball Victoria',
        activeSeasons: 2,
        _id: 3,
    },
    {
        name: 'National Basketball Association',
        org: 'Basketball Victoria',
        activeSeasons: 1,
        _id: 4,
    },
    {
        name: 'National Basketball Association',
        org: 'Basketball Victoria',
        activeSeasons: 0,
        _id: 5,
    },
    {
        name: 'National Basketball Association',
        org: 'Basketball Victoria',
        activeSeasons: 2,
        _id: 6,
    },
    {
        name: 'National Basketball Association',
        org: 'Basketball Victoria',
        activeSeasons: 2,
        _id: 7,
    },
    {
        name: 'National Basketball Association',
        org: 'Basketball Victoria',
        activeSeasons: 2,
        _id: 8,
    },
    {
        name: 'National Basketball Association',
        org: 'Basketball Victoria',
        activeSeasons: 2,
        _id: 9,
    },
    {
        name: 'National Basketball Association',
        org: 'Basketball Victoria',
        activeSeasons: 2,
        _id: 10,
    },
]

export default function Home() {
    const [inSeason, setInSeason] = React.useState(true)
    const [upcomingSeason, setUpcomingSeason] = React.useState(true)
    const [searchValue, setSearchValue] = React.useState('')
    const isDesktop = useMediaQuerySSR(940)

    const [filteredTeams, setFilteredTeams] = React.useState(mockTeams)

    React.useEffect(() => {
        setFilteredTeams(
            mockTeams.filter(({ name }) =>
                name.toLowerCase().includes(searchValue.toLowerCase())
            )
        )
    }, [searchValue, mockTeams])

    return (
        <Flex
            maxW="100vw"
            flexDir="column"
            justifyContent="flex-start"
            bg="grey"
            overflow="hidden"
        >
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
            <Header />
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
            <Box px="3rem" minH="500px" mt={[6, 2]} mb="5rem">
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
                    <AssociationGrid
                        {...{ inSeason, upcomingSeason, teams: filteredTeams }}
                    />
                </Flex>
            </Box>
            <Box w="100%">
                <Footer />
            </Box>
        </Flex>
    )
}
