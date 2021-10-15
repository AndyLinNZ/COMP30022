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
import { useCreateTeam } from 'hooks'
import { Toast } from 'components'
import { createErrorMessage } from 'utils'

const createTeamSchema = yup.object().shape({
    teamName: yup
        .string()
        .required("The Team's name is required")
        .max(20, 'Team Name must be at most 20 characters'),
})

const index = () => {
    const router = useRouter()
    const toast = useToast()

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createTeamSchema),
    })

    const { mutate, isLoading, isSuccess } = useCreateTeam({
        onSuccess: (response) => {
            toast({
                render: () => <Toast title="Successfully created team" type="success" />,
                position: 'top',
                duration: 5000,
            })
            router.push(
                new URL(`${response?.data?.data?._id}/games`, window.location.href).pathname
            )
        },
        onError: (error) => {
            const errMsg = error.response?.data?.error
            toast({
                render: () => (
                    <Toast
                        title={createErrorMessage(
                            errMsg,
                            'There is already has a Team with this name',
                            'Error creating Team'
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
                <title>Dribblr | Create a Team</title>
            </Head>
            <Container heading="Create a new Team" minH="unset" w="unset !important">
                <VStack
                    marginleft={['0', '2rem']}
                    as="form"
                    spacing="2rem"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        label="Team name"
                        placeholder="Team name"
                        error={errors.teamName?.message}
                        {...register('teamName')}
                        isRequired
                    />
                    <HStack spacing="0.5rem">
                        <FormButton onClick={() => router.push(appPaths.DASHBOARD_TEAMS_PATH)}>
                            Back
                        </FormButton>
                        <FormButton type="submit" color="black" bg="orange" isLoading={isLoading || isSuccess}>
                            Create
                        </FormButton>
                    </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default index
