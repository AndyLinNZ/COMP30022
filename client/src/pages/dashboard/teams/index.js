import React from 'react'
import { useUserDetails } from 'hooks'
import { Template, Container, Capsule, CreateCapsule } from 'components/Dashboard'
import { Box, VStack } from '@chakra-ui/react'

import EditButton from 'components/Dashboard/League/EditButton'

const index = () => {
    const { user } = useUserDetails()

    const heading = user?.firstName ? `${user?.firstName}'s teams` : 'Your teams'

    return (
        <Template>
            <Container heading={heading}>
                <VStack spacing="1.25rem">
                    {user?.teams?.map((team) => {
                        const numGrades = team.grades.length
                        const numPlayers = team.players.length
                        const numUpcoming = team.games.filter(({ status }) => status == 'upcoming').length
                        const numCompleted = team.games.filter(({ status }) => status == 'completed').length

                        const gradeText = numGrades ? `Currently registered for ${numGrades} grades` : 'Not registered for any grades'
                        const tags = [['players', `${numPlayers} players`], ['completed', `${numCompleted} matches completed`], ['upcoming', `${numUpcoming} matches upcoming`]]
                        return (
                            <Box
                                key={team._id}
                                display="grid"
                                gridTemplateColumns="12fr 1fr"
                                w="100%"
                            >
                                <Capsule key={team._id} name={team.name} subtext={gradeText} path={`${team.name}`} tags={tags} />
                                <EditButton name={team.name} />
                            </Box>
                        )

                    })}
                    {user?.teams?.length < 4 && <CreateCapsule heading="CREATE A NEW TEAM" />}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
