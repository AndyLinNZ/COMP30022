import React from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, VStack, useToast } from '@chakra-ui/react'
import { Input, FormButton, DeleteConfirm } from 'components/Form'
import { appPaths } from 'utils/constants'
import { useRouter } from 'next/router'
import { useUserDetails, useEditLeague, useDeleteLeague } from 'hooks'
import { createErrorMessage, getLeagueFromUser } from 'utils'
import Toast from 'components/Toast'

const editLeagueSchema = yup.object().shape({
    leagueName: yup
        .string()
        .required("The League's name is required")
        .max(30, 'League Name must be at most 30 characters'),
    organisationName: yup
        .string()
        .required('Please enter the name of the Organisation running this League')
        .max(30, 'Organisation Name must be at most 30 characters'),
})

const index = () => {
    const router = useRouter()
    const toast = useToast()

    const { user } = useUserDetails()
    const league = getLeagueFromUser(user)

    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(editLeagueSchema),
    })

    const {
        mutate: editLeague,
        editIsLoading,
        editIsSuccess,
    } = useEditLeague({
        onSuccess: () => {
            toast({
                render: () => <Toast title="Successfully updated league" type="success" />,
                position: 'top',
                duration: 5000,
            })
            router.push(appPaths.DASHBOARD_LEAGUES_PATH)
        },
        onError: (error) => {
            const errMsg = error.response?.data?.error
            toast({
                render: () => (
                    <Toast
                        title={createErrorMessage(
                            errMsg,
                            'This Organisation already has a League with this name',
                            'Error creating League'
                        )}
                        type="error"
                    />
                ),
                position: 'top',
                duration: 5000,
            })
        },
    })

    const deleteLeague = useDeleteLeague({
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
            <Head>
                <title>Dribblr | Edit Your League</title>
            </Head>
            <Container heading="Edit your League" minH="unset" w="unset !important">
                <DeleteConfirm
                    isOpen={isOpen}
                    onClose={onClose}
                    onDelete={deleteLeague}
                    toDeleteText="League"
                />
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
                            isLoading={editIsLoading || editIsSuccess}
                        >
                            Confirm
                        </FormButton>
                    </HStack>
                    <HStack>
                        <FormButton bg="red" onClick={() => setIsOpen(true)}>
                            Delete League
                        </FormButton>
                    </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default index
