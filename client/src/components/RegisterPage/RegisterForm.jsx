import React from 'react'
import { FormButton, Input } from 'components/Form'
import { Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { LOGIN_PATH } from 'utils/constants'

const RegisterForm = () => {
    const router = useRouter()
    return (
        <VStack spacing="25px">
            <VStack spacing="0.5rem">
                <Input label="First name" placeholder="First name" />
                <Input label="Last name" placeholder="Last name" />
                <Input label="Email address" placeholder="Email address" type="email" />
                <Input
                    label="Password"
                    placeholder="Password"
                    mb="0.5rem"
                    type="password"
                />
                <FormButton>SIGN UP</FormButton>
            </VStack>
            <VStack spacing="0.5rem">
                <Text>Already have an account?</Text>
                <FormButton inverse onClick={() => router.push(LOGIN_PATH)}>
                    LOG IN
                </FormButton>
            </VStack>
        </VStack>
    )
}

export default RegisterForm
