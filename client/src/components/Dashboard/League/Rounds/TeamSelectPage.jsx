import React from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, Box, useToast, Text, VStack } from '@chakra-ui/react'
import { FormButton } from 'components/Form'
import { useRouter } from 'next/router'
import { useMediaQuerySSR, useTeams } from 'hooks'
import { Toast } from 'components'
import { TeamCapsule, SearchInput } from 'components/Dashboard/League/Rounds'

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

const TeamSelectPage = ({ selectedTeams, setSelectedTeams, handleNextPage }) => {
    const router = useRouter()
    const { teams } = useTeams(router.query?.gradeId)
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

    const isHorizontal = useMediaQuerySSR(770)
    const height = isHorizontal ? 400 : 250

    return (
        <GenerateMatchesContainer>
            <VStack w="100%" h={height} spacing="1rem" alignItems="flex-start">
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
            <VStack w="100%" h={height} pos="relative" alignItems="flex-start">
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
                    <FormButton onClick={() => router.back()}>CANCEL</FormButton>
                    <FormButton bg="orange" inverse onClick={handleNextPage}>
                        NEXT
                    </FormButton>
                </HStack>
            </VStack>
        </GenerateMatchesContainer>
    )
}

export default TeamSelectPage
