import React from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, VStack, useToast } from '@chakra-ui/react'
import { FormButton, Input } from 'components/Form'
import { useRouter } from 'next/router'
import { useUserDetails, useCreateSeasonGrade } from 'hooks'
import { getSeasonFromUser, createErrorMessage } from 'utils'
import { Toast } from 'components'

const createGradeSchema = yup.object().shape({
    gradeName: yup
        .string()
        .required("The Grade's name is required")
        .max(20, 'Grade Name must be at most 20 characters'),
    gradeDifficulty: yup.string().required("The Grade's difficulty is required"),
    gradeGender: yup.string().required("The Grade's gender is required"),
})

const create = () => {
    const router = useRouter()
    const { user } = useUserDetails()
    const season = getSeasonFromUser(user)

    const toast = useToast()
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createGradeSchema),
    })

    const { mutate, isLoading, isSuccess } = useCreateSeasonGrade({
        onSuccess: (response) => {
            router.push(
                new URL(`${response?.data?.data?._id}/rounds`, window.location.href).pathname
            )
        },
        onError: (error) => {
            const errMsg = error.response?.data?.error
            toast({
                render: () => (
                    <Toast
                        title={createErrorMessage(
                            errMsg,
                            'This Season already has a Grade with this name',
                            'Error creating Grade'
                        )}
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
                <title>Dribblr | Create a Grade</title>
            </Head>
            <Container heading={`Add a Grade to ${season?.name}`} minH="unset" w="unset !important">
                <VStack
                    marginleft={['0', '2rem']}
                    as="form"
                    spacing="2rem"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        label="Grade name"
                        placeholder="Enter your grade name"
                        error={errors.gradeName?.message}
                        {...register('gradeName')}
                        isRequired
                        width="100%"
                    />

                    <HStack w="100%">
                        <Input
                            label="Grade gender"
                            type="select"
                            placeholder="Select a grade gender"
                            isRequired
                            error={errors.gradeGender?.message}
                            {...register('gradeGender')}
                        >
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="mixed">mixed</option>
                        </Input>

                        <Input
                            label="Level"
                            type="select"
                            placeholder="Select a grade level"
                            isRequired
                            error={errors.gradeDifficulty?.message}
                            {...register('gradeDifficulty')}
                        >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                        </Input>
                    </HStack>

                    <HStack spacing="0.5rem">
                        <FormButton
                            onClick={() =>
                                router.push(
                                    window.location.pathname
                                        .split('/')
                                        .slice(0, window.location.pathname.split('/').length - 1)
                                        .join('/')
                                )
                            }
                        >
                            Back
                        </FormButton>
                        <FormButton
                            type="submit"
                            color="black"
                            bg="orange"
                            isLoading={isLoading || isSuccess}
                        >
                            Create
                        </FormButton>
                    </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default create
