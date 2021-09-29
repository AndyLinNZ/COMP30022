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
import { useUserDetails, useEditTeam } from 'hooks'
import { createErrorMessage, getTeamFromUser } from 'utils'
import { Toast } from 'components'

const editTeamSchema = yup.object().shape({
    teamName: yup
        .string()
        .required("The Team's name is required")
        .max(20, 'Team Name must be at most 20 characters'),
})

const edit = () => {
    const router = useRouter()
    const toast = useToast()
    const { user } = useUserDetails()
    const team = getTeamFromUser(user)

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(editTeamSchema),
    })

    const {
        mutate: editTeam,
        editIsLoading,
        editIsSuccess,
    } = useEditTeam({
        onSuccess: () => {
            router.push(appPaths.DASHBOARD_TEAMS_PATH)
        },
        onError: (error) => {
            const errMsg = error.response?.data?.error
            toast({
                render: () => (
                    <Toast
                        title={createErrorMessage(
                            errMsg,
                            'There is already has a Team with this name',
                            'Error editing Team'
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
        console.log(data)
        editTeam(data)
    }

    React.useEffect(() => {
        reset({
            teamName: team?.name,
        })
    }, [team])

    return (
        <Template>
            <Head>
                <title>Dribblr | Edit Your Team</title>
            </Head>
            <Container heading="Edit your Team" minH="unset" w="unset !important">
                <VStack
                    marginleft={['0', '2rem']}
                    as="form"
                    spacing="2rem"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        label="Team name"
                        defaultValue={team?.name}
                        error={errors.teamName?.message}
                        {...register('teamName')}
                        isRequired
                    />
                    <HStack spacing="0.5rem">
                        <FormButton onClick={() => router.push(appPaths.DASHBOARD_TEAMS_PATH)}>
                            Back
                        </FormButton>
                        <FormButton
                            type="submit"
                            color="black"
                            bg="orange"
                            isLoading={editIsLoading || editIsSuccess}
                        >
                            Confirm
                        </FormButton>
                    </HStack>
                    <HStack>
                        <FormButton bg="red">Delete Team</FormButton>
                    </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default edit
