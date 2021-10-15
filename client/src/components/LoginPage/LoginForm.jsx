import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormButton, Input } from 'components/Form'
import { Text, VStack, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { appPaths } from 'utils/constants'
import { useLogin } from 'hooks'
import { isLoggedIn } from 'utils'
import Toast from 'components/Toast'

const loginSchema = yup.object().shape({
    email: yup.string().required('Please enter your email'),
    password: yup.string().required('Please Enter your password'),
})

const LoginForm = () => {
    const router = useRouter()
    const toast = useToast()

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    })
    const {
        mutate: loginUser,
        isLoading,
        isSuccess,
    } = useLogin({
        onSuccess: (response) => {
            window.localStorage.setItem('token', response.data.token)
            router.push(appPaths.DASHBOARD_TEAMS_PATH)
        },
        onError: (error) => {
            const errMsg = error.response?.data?.error || 'Error logging in'
            toast({
                render: () => <Toast title={errMsg} type="error" />,
                position: 'top',
                duration: 5000,
            })
        },
    })

    const onSubmit = (data) => {
        loginUser(data)
    }

    if (isLoggedIn()) {
        router.push(appPaths.HOME_PATH)
    }

    return (
        <VStack spacing="100px">
            <VStack spacing="0.5rem" as="form" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Email address"
                    placeholder="Email address"
                    type="email"
                    error={errors.email?.message}
                    {...register('email')}
                />
                <Input
                    label="Password"
                    placeholder="Password"
                    mb="0.5rem"
                    type="password"
                    error={errors.password?.message}
                    {...register('password')}
                />
                <FormButton isLoading={isLoading || isSuccess} type="submit">
                    LOGIN
                </FormButton>
            </VStack>
            <VStack spacing="0.5rem">
                {/* eslint-disable-next-line*/}
                <Text>{"Don't have an account?"}</Text>
                <FormButton inverse onClick={() => router.push(appPaths.SIGN_UP_PATH)}>
                    SIGN UP NOW
                </FormButton>
            </VStack>
        </VStack>
    )
}

export default LoginForm
