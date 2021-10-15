import React from 'react'
import Head from 'next/head'
import { useGetAllLeagueSeasons, useLeague } from 'hooks'
import { Template } from 'components/Dashboard'
import { VStack, Text, Spinner } from '@chakra-ui/react'
import { Container, InfoContainer } from 'components'

const index = () => {
    const { seasons, isLoading } = useGetAllLeagueSeasons()
    const { league } = useLeague()

    return (
        <Template>
            <Head>
                <title>Dribblr | {league?.name || 'League'}</title>
            </Head>
            <Container league={league} stepperLoc="/">
                {isLoading ? (
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                        position="absolute"
                        top="50%"
                        left="calc(50% - 1rem)"
                    />
                ) : (
                    <>
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
                    </>
                )}
            </Container>
        </Template>
    )
}

export default index
