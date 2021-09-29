import React from 'react'
import Head from 'next/head'
import RegisterForm from 'components/RegisterPage/RegisterForm'
import { Box, VStack } from '@chakra-ui/react'
import Logo from 'components/svg/Logo'

const index = () => {
    return (
        <Box
            w="100vw"
            h="100vh"
            bg="orange"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
        >
            <Head>
                <title>Dribblr | Sign up</title>
            </Head>
            <VStack spacing="1rem">
                <Logo width="300" />
                <RegisterForm />
            </VStack>
        </Box>
    )
}

export default index
