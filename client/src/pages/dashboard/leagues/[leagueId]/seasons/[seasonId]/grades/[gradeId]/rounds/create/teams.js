import React from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, Box, useToast, Text, VStack } from '@chakra-ui/react'
import { FormButton, Input } from 'components/Form'
import { useRouter } from 'next/router'
import { useCreateSeasonGrade, useMediaQuerySSR, useTeams } from 'hooks'
import { createErrorMessage } from 'utils'
import { Toast } from 'components'
import { TeamCapsule, SearchInput } from 'components/Dashboard/League/Rounds'

const createGradeSchema = yup.object().shape({
    gradeName: yup
        .string()
        .required("The Grade's name is required")
        .max(20, 'Grade Name must be at most 20 characters'),
    gradeDifficulty: yup.string().required("The Grade's difficulty is required"),
    gradeGender: yup.string().required("The Grade's gender is required"),
})

const sortByTeam = (teams) => {
    return teams.sort((team1, team2) => {
        if (team1.name < team2.name) return -1
        if (team1.name > team2.name) return 1
        return 0
    })
}

const GenerateMatchesContainer = ({ children }) => {
    const isHorizontal = useMediaQuerySSR(770)

    if (isHorizontal) {
        return (
            <HStack w="100%" h="400px" alignItems="flex-start" spacing="1rem">
                {children}
            </HStack>
        )
    } else {
        return <VStack h="100%">{children}</VStack>
    }
}

const create = () => {
    const router = useRouter()
    const toast = useToast()
    const { teams } = useTeams()
    const [selectedTeams, setSelectedTeams] = React.useState([])
    const [unchosenTeams, setUnchosenTeams] = React.useState([])
    const [displayTeams, setDisplayTeams] = React.useState([])
    const [searchValue, setSearchValue] = React.useState('')

    React.useEffect(() => {
        if (teams) {
            setUnchosenTeams(sortByTeam(teams))
        }
    }, [teams])

    React.useEffect(() => {
        const temp = unchosenTeams.filter((t) =>
            t.name.toUpperCase().includes(searchValue.toUpperCase())
        )
        setDisplayTeams(temp)
    }, [unchosenTeams, searchValue])

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createGradeSchema),
    })

    const handleAddTeam = (team) => {
        setSelectedTeams((prev) => sortByTeam([...prev, team]))
        const temp = unchosenTeams.filter((t) => t.id !== team.id)
        setUnchosenTeams(temp)
    }

    const handleRemoveTeam = (team) => {
        const temp = selectedTeams.filter((t) => t.id !== team.id)
        setSelectedTeams(temp)
        setUnchosenTeams((prev) => sortByTeam([...prev, team]))
    }

    const handleNextPage = () => {
        if (selectedTeams.length >= 2) {
            router.push({
                pathname: new URL('/details', window.location.href).pathname,
                query: {
                    teams: JSON.stringify(selectedTeams),
                },
            })
        } else {
            toast({
                render: () => <Toast title="Please select 2 or more teams" type="error" />,
                position: 'top',
                duration: 5000,
            })
        }
    }

    const isHorizontal = useMediaQuerySSR(770)
    const height = isHorizontal ? 400 : 300

    return (
        <Template>
            <Head>
                <title>Dribblr | Select Teams</title>
            </Head>
            <Container heading="Generate Matches" minH="400px" maxH="600px" xw={['95%', '60%']}>
                <GenerateMatchesContainer>
                    <VStack
                        w="100%"
                        h={`calc(${height}px - 2rem)`}
                        spacing="1rem"
                        alignItems="flex-start"
                    >
                        <Text color="greyText" fontWeight="bold" fontSize="1.75rem">
                            Search for teams to add
                        </Text>
                        <Box w="100%" pr="1rem" marginTop="0 !important">
                            <SearchInput
                                placeholder="Enter team name"
                                value={searchValue}
                                onChange={setSearchValue}
                            />
                        </Box>
                        <VStack w="100%" overflowY="auto">
                            {displayTeams?.map((team) => (
                                <Box w="100%" key={team.name}>
                                    <TeamCapsule
                                        name={team.name}
                                        type="add"
                                        onClick={() => handleAddTeam(team)}
                                    />
                                </Box>
                            ))}
                        </VStack>
                    </VStack>
                    <VStack
                        w="100%"
                        h={`calc(${height}px - 2rem)`}
                        pos="relative"
                        alignItems="flex-start"
                    >
                        <Text color="greyText" fontWeight="bold" fontSize="1.75rem">
                            Assigned:
                        </Text>
                        <VStack mb="2.5rem !important" w="100%" overflowY="auto">
                            {selectedTeams?.map((team) => (
                                <Box w="100%" key={team.name}>
                                    <TeamCapsule
                                        name={team.name}
                                        type="delete"
                                        onClick={() => handleRemoveTeam(team)}
                                    />
                                </Box>
                            ))}
                        </VStack>
                        <HStack pos="absolute" bottom="0" left="50%" transform="translateX(-50%)">
                            <FormButton>CANCEL</FormButton>
                            <FormButton bg="orange" inverse onClick={() => handleNextPage()}>
                                NEXT
                            </FormButton>
                        </HStack>
                    </VStack>
                </GenerateMatchesContainer>
            </Container>
        </Template>
    )
}

export default create
