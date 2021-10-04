import React from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, VStack, useToast } from '@chakra-ui/react'
import Input from 'components/Form/Input'
import FormButton from 'components/Form/FormButton'
import { appPaths } from 'utils/constants'
import { useRouter } from 'next/router'
import { useUserDetails, useUpdateUserDetails } from 'hooks'
import Toast from 'components/Toast'

const userUpdateSchema = yup.object().shape({
    firstName: yup
        .string()
        .required('First name is required'),
    lastName: yup
        .string()
        .required('Last name is required'),
    email: yup
        .string()
        .required('email is required'),
    password: yup
        .string(),
})

const index = () => {
    const router = useRouter()
    const toast = useToast()
    const { user } = useUserDetails()

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userUpdateSchema),
    })

    React.useEffect(() => {
        if(!user) return
        setValue('firstName', user.firstName)
        setValue('lastName', user.lastName)
        setValue('email', user.email)
    }, [user, setValue])

    const { mutate, isLoading } = useUpdateUserDetails({
        onSuccess: () => {
            toast({
                render: () => (
                    <Toast
                        title="Successfully updated details"
                        type="success"
                    />
                ),
                position: 'top',
                duration: 5000,
            })
        },
        onError: (error) => {
            const errMsg = error.response?.data?.error
            toast({
                render: () => (
                    <Toast
                        title={errMsg}
                        type="error"
                    />
                ),
                position: 'top',
                duration: 5000,
            })
        },
    })

    const onSubmit = (data) => {
        mutate(data)
    }

    return (
        <Template>
            <Head>
                <title>Dribblr | My Details</title>
            </Head>
            <Container heading="My Details" minH="unset" w="unset !important">
                <VStack
                    marginleft={['0', '2rem']}
                    as="form"
                    spacing="2rem"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        label="First name"
                        placeholder="First name"
                        error={errors.firstName?.message}
                        {...register('firstName')}
                        isRequired
                    />
                    <Input
                        label="Last name"
                        placeholder="Last name"
                        error={errors.lastName?.message}
                        {...register('lastName')}
                        isRequired
                    />
                    <Input
                        label="Email"
                        placeholder="Email"
                        error={errors.email?.message}
                        {...register('email')}
                        isRequired
                    />
                    <Input
                        label="Password"
                        placeholder="Password"
                        error={errors.password?.message}
                        {...register('password')}
                    />
                    <HStack spacing="0.5rem">
                        <FormButton onClick={() => router.push(appPaths.DASHBOARD_TEAMS_PATH)}>
                            Cancel
                        </FormButton>
                        <FormButton type="submit" color="black" bg="orange" isLoading={isLoading}>
                            Confirm
                        </FormButton>
                    </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default index
