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
import { useUserDetails, useEditLeague, useDeleteLeague } from 'hooks'
import { getLeagueFromUser } from 'utils'

const editLeagueSchema = yup.object().shape({
    leagueName: yup
        .string()
        .required("The League's name is required")
        .max(20, "League Name must be at most 20 characters"),
    organisationName: yup
        .string()
        .required("Please enter the name of the Organisation running this League"),
})

const index = () => {
    const router = useRouter()
    const { user } = useUserDetails()
    const league = getLeagueFromUser(user)

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(editLeagueSchema),
    })

    const { mutate: editLeague, editIsLoading } = useEditLeague({
        onSuccess: () => {
            router.push(appPaths.DASHBOARD_LEAGUES_PATH)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const { mutate: deleteLeague, deleteIsLoading } = useDeleteLeague({
        onSuccess: () => {
            router.push(appPaths.DASHBOARD_LEAGUES_PATH)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const onSubmit = (data) => {
        editLeague(data)
    }

    React.useEffect(() => {
        reset({
            leagueName: league?.name,
            organisationName: league?.organisation,
        })
    }, [league])

    return (
        <Template>
            <Container heading="Edit your League" minH="unset" w="unset !important">
                <VStack
                    marginleft={['0', '2rem']}
                    as="form"
                    spacing="2rem"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        label="League name"
                        defaultValue={league?.name}
                        error={errors.leagueName?.message}
                        {...register('leagueName')}
                        isRequired
                    />
                    <Input
                        label="Organisation name"
                        defaultValue={league?.organisation}
                        error={errors.organisationName?.message}
                        {...register('organisationName')}
                        isRequired
                    />
                    <HStack spacing="0.5rem">
                        <FormButton onClick={() => router.push(appPaths.DASHBOARD_LEAGUES_PATH)}>
                            Back
                        </FormButton>

                        <FormButton
                            type="submit"
                            color="black"
                            bg="orange"
                            isLoading={editIsLoading}
                        >
                            Confirm
                        </FormButton>
                    </HStack>
                    <HStack>
                        <FormButton
                            bg="red"
                            onClick={() => deleteLeague()}
                            isLoading={deleteIsLoading}
                        >
                            Delete League
                        </FormButton>
                    </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default index
