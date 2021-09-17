import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, VStack } from '@chakra-ui/react'
import { DatePicker, FormButton, Input } from 'components/Form'
import { appPaths } from 'utils/constants'
import { useRouter } from 'next/router'
import { useCreateLeagueSeason } from 'hooks'

const createSeasonSchema = yup.object().shape({
    seasonName: yup
        .string()
        .required("The Season's name is required")
        .max(20, 'Season Name must be at most 20 characters'),
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

    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(createSeasonSchema),
    })

    const { mutate, isLoading } = useCreateLeagueSeason({
        onSuccess: (response) => {
            router.push(new URL(response?.data?.data?.name, window.location.href).pathname)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const onSubmit = (data) => {
        mutate(data)
    }

    return (
        <Template>
            <Container heading="Create a new Season" minH="unset" w="unset !important">
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
                        <FormButton onClick={() => router.push(appPaths.DASHBOARD_LEAGUES_PATH)}>
                            Back
                        </FormButton>
                        <FormButton type="submit" color="black" bg="orange" isLoading={isLoading}>
                            Create
                        </FormButton>
                    </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default create
