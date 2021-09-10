import React from 'react'
import { useMediaQuerySSR, useUserDetails } from 'hooks'
import { Template, Container } from 'components/Dashboard'
import { LeagueCapsule, AddLeagueCapsule } from 'components/Dashboard/leagues'
import { VStack } from '@chakra-ui/react'

const index = () => {
    const isDesktop = useMediaQuerySSR(940)

    const { user } = useUserDetails()
    console.log(user)

    const heading = user?.firstName ? `${user?.firstName}'s leagues` : 'Your leagues'

    return (
        <Template>
            <Container heading={heading}>
                <VStack spacing="1.25rem">
                    {user?.leagues?.map((league) => {
                        return <LeagueCapsule key={league._id} league={league} />
                    })}
                    {user?.leagues?.length < 4 && <AddLeagueCapsule />}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
