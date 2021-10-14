import React from 'react'
import Head from 'next/head'
import { useGetAllLeagueSeasons, useUserDetails } from 'hooks'
import { Template, CreateCapsule } from 'components/Dashboard'
import { Box, VStack, Spinner } from '@chakra-ui/react'
import { Container, InfoContainer } from 'components/Dashboard/League'
import { getLeagueFromUser } from 'utils'
import EditButton from 'components/Dashboard/League/EditButton'

const index = () => {
    const { seasons, isLoading } = useGetAllLeagueSeasons()
    const { user } = useUserDetails()
    const league = getLeagueFromUser(user)

    return (
        <Template>
            <Head>
                <title>Dribblr | {league?.name || 'League'} - Seasons</title>
            </Head>
            <Container league={league}>
                <VStack spacing="1.25rem">
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
                        <>
                            <CreateCapsule
                                heading="ADD A NEW SEASON"
                                borderRadius="1rem"
                                buttonNum={1}
                            />
                            {seasons?.map((season) => {
                                return (
                                    <Box
                                        key={season._id}
                                        display="grid"
                                        gridTemplateColumns="12fr 1fr"
                                        w="100%"
                                    >
                                        <InfoContainer
                                            season={season}
                                            path={`${season._id}/grades`}
                                        />
                                        <EditButton name={season._id} />
                                    </Box>
                                )
                            })}
                        </>
                    )}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
