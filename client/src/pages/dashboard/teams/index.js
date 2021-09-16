import React from 'react'
import { useUserDetails } from 'hooks'
import { Template, Container, Capsule, CreateCapsule } from 'components/Dashboard'
import { VStack } from '@chakra-ui/react'

const mockTeams = [
    { name: 'Lygon Kangaroos' },
    { name: 'Authentication Geniuses' },
    { name: 'Roaring Rhinosaurs' },
    // { name: 'Sprinting Sandals' },
]
const index = () => {
    const { user } = useUserDetails()

    const heading = user?.firstName ? `${user?.firstName}'s teams` : 'Your teams'

    return (
        <Template>
            <Container heading={heading}>
                <VStack spacing="1.25rem">
                    {mockTeams.map((team) => {
                        return <Capsule key={team._id} name={team.name} path={team._id} />
                    })}
                    {mockTeams.length < 4 && <CreateCapsule heading="CREATE A NEW TEAM" />}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
