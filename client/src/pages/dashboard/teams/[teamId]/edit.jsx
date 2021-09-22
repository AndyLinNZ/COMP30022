import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, VStack } from '@chakra-ui/react'
import Input from 'components/Form/Input'
import FormButton from 'components/Form/FormButton'
import { appPaths } from 'utils/constants'
import { useRouter } from 'next/router'
import { useUserDetails, useEditTeam } from 'hooks'
import { getTeamFromUser } from 'utils'

const editTeamSchema = yup.object().shape({
    teamName: yup
        .string()
        .required("The Team's name is required")
        .max(20, "Team Name must be at most 20 characters"),
})

const edit = () => {
    const router = useRouter()
    const { user } = useUserDetails()
    const team = getTeamFromUser(user)

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(editTeamSchema),
    })

    const { mutate: editTeam, editIsLoading, editIsSuccess } = useEditTeam({
        onSuccess: () => {
            router.push(appPaths.DASHBOARD_TEAMS_PATH)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const onSubmit = (data) => {
        editTeam(data)
    }

    React.useEffect(() => {
        reset({
            teamName: team?.name
        })
    }, [team])

    return (
        <Template>
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
                        <FormButton type="submit" color="black" bg="orange" isLoading={editIsLoading || editIsSuccess}>
                            Confirm
                        </FormButton>
                    </HStack>
                    <HStack>
                        <FormButton bg="red">
                            Delete Team
                        </FormButton>
                    </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default edit