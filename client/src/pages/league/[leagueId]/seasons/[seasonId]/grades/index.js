import React from 'react'
import Head from 'next/head'
import { useGetAllSeasonGrades, useLeague } from 'hooks'
import { Template } from 'components/Dashboard'
import { Box, VStack, Text } from '@chakra-ui/react'
import { Container, GradeContainer } from 'components'

const index = () => {
    const { grades } = useGetAllSeasonGrades()
    const { league } = useLeague()

    return (
        <Template>
            <Head>
                <title>Dribblr | {league?.name || 'League'} - Grades</title>
            </Head>
            <Container league={league}>
                <VStack spacing="1.25rem">
                    {(!grades || grades.length === 0) && (
                        <Text
                            fontSize="2rem"
                            textAlign="center"
                            color="greyText"
                            pos="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                        >
                            This Season does not have any Grades yet!
                        </Text>
                    )}
                    {grades?.map((grade) => {
                        return (
                            <Box key={grade._id} w="100%">
                                <GradeContainer grade={grade} path={grade._id} />
                            </Box>
                        )
                    })}
                </VStack>
            </Container>
        </Template>
    )
}

export default index
