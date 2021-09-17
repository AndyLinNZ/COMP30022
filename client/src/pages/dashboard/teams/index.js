import React from 'react'
import { useUserDetails } from 'hooks'
import { Template, Container, Capsule, CreateCapsule } from 'components/Dashboard'
import { Box, VStack } from '@chakra-ui/react'
import EditButton from 'components/Dashboard/League/EditButton'

const mockTeams = [
    { name: 'Lygon Kangaroos' },
    { name: 'Authentication Geniuses' },
    { name: 'Roaring Rhinosaurs' },
    // { name: 'Sprinting Sandals' },
]
const index = () => {
    const { user } = useUserDetails()

    const heading = user?.firstName ? `${user?.firstName}'s Teams` : 'Your Teams'

    return (
        <Template>
            <Container heading={heading}>
                <VStack spacing="1.25rem">
                    {mockTeams.map((team) => {
                        return (
                            <Box
                                key={team._id}
                                display="grid"
                                gridTemplateColumns="12fr 1fr"
                                w="100%"
                            >
                                <Capsule key={team._id} name={team.name} path={team._id} />
                                <EditButton />
                            </Box>
                        )
                    })}
                    {mockTeams.length < 4 && <CreateCapsule heading="CREATE A NEW TEAM" />}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
