import React from 'react'
import { useUserDetails } from 'hooks'
import { Template, Container, Capsule, CreateCapsule } from 'components/Dashboard'
import { Box, VStack } from '@chakra-ui/react'
import EditButton from 'components/Dashboard/League/EditButton'

const index = () => {
    const { user } = useUserDetails()

    const heading = user?.firstName ? `${user?.firstName}'s leagues` : 'Your leagues'

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
                                <Capsule name={league.name} path={`${league.name}/seasons`} />
                                <EditButton name={league.name} />
                            </Box>
                        )
                    })}
                    {user?.leagues?.length < 4 && <CreateCapsule heading="CREATE A NEW LEAGUE" />}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
