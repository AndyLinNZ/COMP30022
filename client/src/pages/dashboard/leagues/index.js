import React from 'react'
import { useUserDetails } from 'hooks'
import { Template, Container, Capsule, CreateCapsule } from 'components/Dashboard'
import { Box, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { appPaths } from 'utils/constants'
import EditButton from 'components/Dashboard/League/EditButton'

const index = () => {
    const router = useRouter()
    const { user } = useUserDetails()

    const heading = user?.firstName ? `${user?.firstName}'s Leagues` : 'Your Leagues'

    return (
        <Template>
            <Container heading={heading}>
                <VStack spacing="1.25rem">
                    {user?.leagues?.map((league) => {
                        return (
                            <Box
                                key={league._id}
                                display="grid"
                                gridTemplateColumns="12fr 1fr"
                                w="100%"
                            >
                                <Capsule
                                    key={league._id}
                                    name={league.name}
                                    path={`${league.name}/seasons`}
                                />
                                <EditButton />
                            </Box>
                        )
                    })}
                    {user?.leagues?.length < 4 && (
                        <CreateCapsule heading="CREATE A NEW LEAGUE" borderRadius="999px" />
                    )}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
