import React from 'react'
import { useUserDetails } from 'hooks'
import { Template, Container, Capsule, CreateCapsule } from 'components/Dashboard'
import { VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { appPaths } from 'utils/constants'

const index = () => {
    const router = useRouter()
    const { user } = useUserDetails()

    const heading = user?.firstName ? `${user?.firstName}'s leagues` : 'Your leagues'

    return (
        <Template>
            <Container heading={heading}>
                <VStack spacing="1.25rem">
                    {user?.leagues?.map((league) => {
                        return (
                            <Capsule
                                key={league._id}
                                name={league.name}
                                path={`${league.name}/seasons`}
                            />
                        )
                    })}
                    {user?.leagues?.length < 4 && <CreateCapsule heading="CREATE A NEW LEAGUE" />}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
