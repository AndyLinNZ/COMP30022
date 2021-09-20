import React from 'react'
import { useUserDetails } from 'hooks'
import { Template, Container, Capsule } from 'components/Dashboard'
import { Box, VStack } from '@chakra-ui/react'

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
                                <Capsule name={league.name} path={`${league._id}/seasons`} />
                            </Box>
                        )
                    })}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
