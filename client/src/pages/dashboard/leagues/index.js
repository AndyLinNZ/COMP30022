import React from 'react'
import Head from 'next/head'
import { useUserDetails } from 'hooks'
import { Template, Container, Capsule, CreateCapsule } from 'components/Dashboard'
import { Box, VStack, Spinner } from '@chakra-ui/react'
import EditButton from 'components/Dashboard/League/EditButton'

const index = () => {
    const { user, isLoading } = useUserDetails()
    const heading = user?.firstName ? `${user?.firstName}'s Leagues` : 'Your Leagues'

    return (
        <Template>
            <Head>
                <title>Dribblr | Leagues</title>
            </Head>
            <Container heading={heading}>
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
                    <VStack spacing="1.25rem">
                        {user?.leagues?.length < 4 && (
                            <CreateCapsule
                                heading="CREATE A NEW LEAGUE"
                                borderRadius="999px"
                                buttonNum={1}
                            />
                        )}
                        {user?.leagues?.map((league) => {
                            return (
                                <Box
                                    key={league._id}
                                    display="grid"
                                    gridTemplateColumns="12fr 1fr"
                                    w="100%"
                                >
                                    <Capsule
                                        name={league.name}
                                        subtext={league.organisation}
                                        path={`${league._id}/seasons`}
                                    />
                                    <EditButton name={league._id} />
                                </Box>
                            )
                        })}
                    </VStack>
                )}
            </Container>
        </Template>
    )
}

export default index
