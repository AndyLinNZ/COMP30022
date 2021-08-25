import React from 'react'
import { FormButton, Input } from 'components/Form'
import { Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { SIGN_UP_PATH } from 'utils/constants'

const LoginForm = () => {
    const router = useRouter()
    return (
        <VStack spacing="100px">
            <VStack spacing="0.5rem">
                <Input label="Email address" placeholder="Email address" type="email" />
                <Input
                    label="Password"
                    placeholder="Password"
                    mb="0.5rem"
                    type="password"
                />
                <FormButton>LOGIN</FormButton>
            </VStack>
            <VStack spacing="0.5rem">
                {/* eslint-disable-next-line*/}
                <Text>{"Don't have an account?"}</Text>
                <FormButton inverse onClick={() => router.push(SIGN_UP_PATH)}>
                    SIGN UP NOW
                </FormButton>
            </VStack>
        </VStack>
    )
}

export default LoginForm
