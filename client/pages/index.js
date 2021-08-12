import React from 'react'
import { Flex, Box, Heading, Checkbox, Text } from '@chakra-ui/react'
import Header from 'components/Header'
import HeroBackDrop from 'components/svg/HeroBackDrop'
import AssociationSearch from 'components/AssociationPage/AssociationSearch'
import AssociationGrid from 'components/AssociationPage/AssociationGrid'

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
    const [boxHeight, setBoxHeight] = React.useState(0)
    const [inSeason, setInSeason] = React.useState(true)
    const [upcomingSeason, setUpcomingSeason] = React.useState(true)
    const [searchValue, setSearchValue] = React.useState('')

    const [filteredTeams, setFilteredTeams] = React.useState(mockTeams)

    React.useEffect(() => {
        setFilteredTeams(
            mockTeams.filter(({ name }) =>
                name.toLowerCase().includes(searchValue.toLowerCase())
            )
        )
    }, [searchValue, mockTeams])

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            const width = window.innerWidth
            if (width < 1000) {
                setBoxHeight((1 / window.innerWidth) * 200000)
            } else {
                setBoxHeight(0)
            }
        })
    })

    return (
        <Flex
            maxW="100vw"
            flexDir="column"
            justifyContent="flex-start"
            overflowX="hidden"
            bg="grey"
        >
            <Box h={boxHeight} bg="orange" overflow="hidden" />
            <HeroBackDrop />
            <Header />
            <Flex
                pos="absolute"
                left="50%"
                transform="translateX(-50%)"
                mt="60px"
                flexDir="column"
                w="100%"
            >
                <Heading
                    fontSize="120px"
                    fontWeight="normal"
                    color="heading"
                    mb="6"
                    textAlign="center"
                >
                    dribblr.
                </Heading>
                <AssociationSearch
                    value={searchValue}
                    onChange={setSearchValue}
                />
            </Flex>
            <Box px="3rem" minH="500px">
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
                <Flex alignItems="center" width="100%" mt="5rem">
                    <AssociationGrid
                        {...{ inSeason, upcomingSeason, teams: filteredTeams }}
                    />
                </Flex>
            </Box>
        </Flex>
    )
}
