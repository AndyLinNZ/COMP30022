import React from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, VStack, useToast } from '@chakra-ui/react'
import { DatePicker, FormButton, Input } from 'components/Form'
import { useRouter } from 'next/router'
import { useUserDetails, useCreateLeagueSeason } from 'hooks'
import { getLeagueFromUser, createErrorMessage } from 'utils'
import { Toast } from 'components'

const createSeasonSchema = yup.object().shape({
    seasonName: yup
        .string()
        .required("The Season's name is required")
        .max(30, 'Season Name must be at most 30 characters'),
    seasonStart: yup.date().default(null).required('The starting date of the seasion is required'),
    seasonFinish: yup
        .date()
        .default(null)
        .required('The ending date of the season is required')
        .when(
            'seasonStart',
            (seasonStart, yup) =>
                seasonStart && yup.min(seasonStart, 'End date cannot be before Start date')
        ),
})

const create = () => {
    const router = useRouter()
    const { user } = useUserDetails()
    const league = getLeagueFromUser(user)

    const toast = useToast()
    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(createSeasonSchema),
    })

    const { mutate, isLoading, isSuccess } = useCreateLeagueSeason({
        onSuccess: (response) => {
            toast({
                render: () => <Toast title="Successfully created season" type="success" />,
                position: 'top',
                duration: 5000,
            })
            router.push(
                new URL(`${response?.data?.data?._id}/grades`, window.location.href).pathname
            )
        },
        onError: (error) => {
            const errMsg = error.response?.data?.error
            toast({
                render: () => (
                    <Toast
                        title={createErrorMessage(
                            errMsg,
                            'This League already has a Season with this name',
                            'Error creating Season'
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
                <title>Dribblr | Create a Season</title>
            </Head>
            <Container
                heading={`Add a Season to ${league?.name}`}
                minH="unset"
                w="unset !important"
            >
                <VStack
                    marginleft={['0', '2rem']}
                    as="form"
                    spacing="2rem"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        label="Season name"
                        placeholder="Season name"
                        error={errors.seasonName?.message}
                        {...register('seasonName')}
                        isRequired
                        width="100%"
                    />
                    <HStack w="100%">
                        <DatePicker
                            control={control}
                            label="Start date"
                            name="seasonStart"
                            isRequired
                        />
                        <DatePicker
                            control={control}
                            label="End date"
                            name="seasonFinish"
                            isRequired
                        />
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
