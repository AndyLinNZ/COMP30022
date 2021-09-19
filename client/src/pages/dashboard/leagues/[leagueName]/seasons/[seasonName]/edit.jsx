import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Spinner } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, VStack } from '@chakra-ui/react'
import { DatePicker, FormButton, Input } from 'components/Form'
import { useRouter } from 'next/router'
import { useUserDetails, useEditSeason } from 'hooks'
import { getSeasonFromUser } from 'utils'

const editSeasonSchema = yup.object().shape({
    seasonName: yup.string().max(20, 'Season Name must be at most 20 characters'),
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

const newSeasonUrl = (name) => {
    const original = window.location.href.split('/')
    const removeOriginal = original.slice(0, original.length - 2)
    removeOriginal.push(name)
    return removeOriginal.join('/')
}

const edit = () => {
    const router = useRouter()
    const { user } = useUserDetails()
    const season = getSeasonFromUser(user)

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        control,
    } = useForm({
        resolver: yupResolver(editSeasonSchema),
    })

    const {
        mutate: editSeason,
        isLoading,
        isSuccess,
    } = useEditSeason({
        onSuccess: (response) => {
            router.push(new URL(newSeasonUrl(response?.data?.data?.name)))
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const onSubmit = (data) => {
        editSeason(data)
    }

    React.useEffect(() => {
        if (season) {
            reset({
                seasonName: season?.name,
                seasonStart: new Date(season.dateStart),
                seasonFinish: new Date(season.dateFinish),
            })
        }
    }, [season])

    return (
        <Template>
            {isLoading || isSuccess ? (
                <Spinner
                    thickness="4px"
                    speed="0.85s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                    position="absolute"
                    top="50%"
                    left="calc(50% - 2rem)"
                />
            ) : (
                <Container heading="Update Season" minH="unset" w="unset !important">
                    <VStack
                        marginleft={['0', '2rem']}
                        as="form"
                        spacing="2rem"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Input
                            label="Season name"
                            placeholder={season?.name}
                            error={errors.seasonName?.message}
                            {...register('seasonName')}
                            width="100%"
                        />
                        <HStack w="100%">
                            <DatePicker
                                control={control}
                                label="Start date"
                                name="seasonStart"
                                placeHolder={season?.dateStart}
                            />
                            <DatePicker
                                control={control}
                                label="End date"
                                name="seasonFinish"
                                placeHolder={season?.dateFinish}
                            />
                        </HStack>
                        <HStack spacing="0.5rem">
                            <FormButton onClick={() => router.back()}>Back</FormButton>
                            <FormButton
                                type="submit"
                                color="black"
                                bg="orange"
                                isLoading={isLoading}
                            >
                                Update
                            </FormButton>
                        </HStack>
                    </VStack>
                </Container>
            )}
        </Template>
    )
}

export default edit
