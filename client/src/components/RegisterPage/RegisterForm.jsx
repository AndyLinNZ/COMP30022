import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormButton, Input } from 'components/Form'
import { Text, VStack, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { appPaths } from 'utils/constants'
import { useRegister } from 'hooks'
import { isBrowser, isLoggedIn } from 'utils'
import Toast from 'components/Toast'

const registerSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Incorrect email format').required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /(?=.*[a-zA-Z])(?=.*[0-9])/,
            'Password must contain at least 1 letter and 1 number'
        )
        .required('Password is required'),
})

const RegisterForm = () => {
    const router = useRouter()
    const toast = useToast()

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    })

    const { mutate, isLoading } = useRegister({
        onSuccess: (response) => {
            window.localStorage.setItem('token', response.data.token)
            router.push(appPaths.DASHBOARD_TEAMS_PATH)
        },
        onError: (error) => {
            const errMsg = error.response?.data?.error || 'Error registering'
            toast({
                render: () => <Toast title={errMsg} type="error" />,
                position: 'top',
                duration: 5000,
            })
        },
    })

    const onSubmit = (data) => {
        mutate(data)
    }

    if (isLoggedIn()) {
        router.push(appPaths.HOME_PATH)
    }

    return (
        <VStack spacing="25px">
            <VStack spacing="0.5rem" as="form" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="First name"
                    placeholder="First name"
                    error={errors.firstName?.message}
                    {...register('firstName')}
                />
                <Input
                    label="Last name"
                    placeholder="Last name"
                    error={errors.lastName?.message}
                    {...register('lastName')}
                />
                <Input
                    label="Email address"
                    placeholder="Email address"
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
                <FormButton type="submit" disabled={Object.keys(errors) > 0} isLoading={isLoading}>
                    SIGN UP
                </FormButton>
            </VStack>
            <VStack spacing="0.5rem">
                <Text>Already have an account?</Text>
                <FormButton inverse onClick={() => router.push(appPaths.LOGIN_PATH)}>
                    LOG IN NOW
                </FormButton>
            </VStack>
        </VStack>
    )
}

export default RegisterForm
