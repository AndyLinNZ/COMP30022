import React from 'react'
import { useGetAllSeasonGrades, useUserDetails } from 'hooks'
import { Template, CreateCapsule } from 'components/Dashboard'
import { Box, VStack } from '@chakra-ui/react'
import { Container, InfoContainer } from 'components/Dashboard/League'
import { getSeasonFromUser, getLeagueFromUser } from 'utils'
import EditButton from 'components/Dashboard/League/EditButton'

const index = () => {

    const { grades } = useGetAllSeasonGrades()
    const { user }  = useUserDetails()
    const season = getSeasonFromUser(user)
    const league = getLeagueFromUser(user)

    return (
        <Template>
            <Container league={league}>
                <VStack spacing="1.25rem">
                    {grades?.map((grade) => {
                        return (
                            <Box
                                key={grade._id}
                                display="grid"
                                gridTemplateColumns="12fr 1fr"
                                w="100%"
                            >
                                <GradeContainer grade={grade} path={grade._id} />
                                <EditButton />
                            </Box>
                        )
                    })}
                    <CreateCapsule heading="ADD A NEW GRADE" />
                </VStack>
            </Container>
        </Template>
    )
}

export default index
