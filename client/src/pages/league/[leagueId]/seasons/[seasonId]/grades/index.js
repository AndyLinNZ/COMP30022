import React from 'react'
import { useGetAllSeasonGrades, useLeague } from 'hooks'
import { Template } from 'components/Dashboard'
import { Box, VStack } from '@chakra-ui/react'
import { Container, GradeContainer } from 'components/Dashboard/League'

const index = () => {
    const { grades } = useGetAllSeasonGrades()
    const { league } = useLeague()

    return (
        <Template>
            <Container league={league}>
                <VStack spacing="1.25rem">
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
