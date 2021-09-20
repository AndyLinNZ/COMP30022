import React from 'react'
import { useGetAllLeagueSeasons } from 'hooks'
import { Template } from 'components/Dashboard'
import { Box, VStack } from '@chakra-ui/react'
import { Container, InfoContainer } from 'components/Dashboard/League'

const index = () => {
    const { seasons } = useGetAllLeagueSeasons()

    return (
        <Template>
            <Container league={''}>
                <VStack spacing="1.25rem">
                    {seasons?.map((season) => {
                        return (
                            <InfoContainer
                                key={season._id}
                                season={season}
                                path={`${season._id}/grades`}
                            />
                        )
                    })}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
