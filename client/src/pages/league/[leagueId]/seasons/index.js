import React from 'react'
import { useGetAllLeagueSeasons, useLeague } from 'hooks'
import { Template } from 'components/Dashboard'
import { VStack, Text } from '@chakra-ui/react'
import { Container, InfoContainer } from 'components/Dashboard/League'

const index = () => {
    const { seasons } = useGetAllLeagueSeasons()
    const { league } = useLeague()

    return (
        <Template>
            <Container league={league}>
                {(!seasons || seasons.length === 0) && (
                    <Text
                        fontSize="2rem"
                        textAlign="center"
                        color="greyText"
                        pos="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                    >
                        This League does not have any Seasons yet!
                    </Text>
                )}
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
