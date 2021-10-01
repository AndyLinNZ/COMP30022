import React from 'react'
import Head from 'next/head'
import { useUserDetails } from 'hooks'
import { Template, Container, Capsule, CreateCapsule } from 'components/Dashboard'
import { IconButton, Box, VStack } from '@chakra-ui/react'
import EditButton from 'components/Dashboard/League/EditButton'
import PersonAddOutlined from '@material-ui/icons/PersonAddOutlined'
import { useRouter } from 'next/router'

const index = () => {
    const router = useRouter()
    const { user } = useUserDetails()

    const heading = user?.firstName ? `${user?.firstName}'s Teams` : 'Your Teams'

    return (
        <Template>
            <Head>
                <title>Dribblr | Teams</title>
            </Head>
            <Container heading={heading}>
                <VStack spacing="1.25rem">
                    {user?.teams?.length < 8 && (
                        <CreateCapsule
                            heading="CREATE A NEW TEAM"
                            borderRadius="999px"
                            buttonNum={2}
                        />
                    )}
                    {user?.teams?.map((team) => {
                        const numGrades = team.grades.length
                        const numPlayers = team.players.length
                        const numUpcoming = team.games.filter(
                            ({ status }) => status == 'upcoming'
                        ).length
                        const numCompleted = team.games.filter(
                            ({ status }) => status == 'completed'
                        ).length

                        const gradeText = numGrades
                            ? `Currently registered for ${numGrades} grades`
                            : 'Not registered for any grades'
                        const tags = [
                            ['players', `${numPlayers} players`],
                            ['completed', `${numCompleted} matches completed`],
                            ['upcoming', `${numUpcoming} matches upcoming`],
                        ]
                        return (
                            <Box
                                key={team._id}
                                display="grid"
                                gridTemplateColumns="12fr 1fr 1fr"
                                w="100%"
                            >
                                <Capsule
                                    name={team.name}
                                    subtext={gradeText}
                                    path={`${team._id}/games`}
                                    tags={tags}
                                />
                                <IconButton
                                    icon={<PersonAddOutlined />}
                                    size="lg"
                                    alignSelf="center"
                                    justifySelf="center"
                                    cursor="pointer"
                                    marginLeft="1rem"
                                    onClick={() =>
                                        router.push(`${window.location.pathname}/${team._id}/add`)
                                    }
                                />
                                <EditButton name={team._id} />
                            </Box>
                        )
                    })}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
