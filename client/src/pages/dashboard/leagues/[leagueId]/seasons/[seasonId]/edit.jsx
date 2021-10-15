import React from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, VStack, useToast } from '@chakra-ui/react'
import { DatePicker, FormButton, Input, DeleteConfirm } from 'components/Form'
import { useRouter } from 'next/router'
import { useUserDetails, useEditSeason, useDeleteSeason } from 'hooks'
import { createErrorMessage, getSeasonFromUser } from 'utils'
import moment from 'moment'
import Toast from 'components/Toast'

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

const edit = () => {
    const router = useRouter()
    const toast = useToast()

    const { user } = useUserDetails()
    const season = getSeasonFromUser(user)

    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)

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
        editIsLoading,
        editIsSuccess,
    } = useEditSeason({
        onSuccess: (response) => {
            toast({
                render: () => <Toast title="Successfully updated season" type="success" />,
                position: 'top',
                duration: 5000,
            })
            router.push(
                window.location.pathname
                    .split('/')
                    .slice(0, window.location.pathname.split('/').length - 2)
                    .concat([response?.data?.data?._id, 'grades'])
                    .join('/')
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
                            'Error editing Season'
                        )}
                        type="error"
                    />
                ),
                position: 'top',
                duration: 5000,
            })
        },
    })

    const deleteSeason = useDeleteSeason({
        onSuccess: () => {
            router.push(
                window.location.pathname
                    .split('/')
                    .slice(0, window.location.pathname.split('/').length - 2)
                    .join('/')
            )
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const onSubmit = (data) => {
        editSeason(data)
    }

    React.useEffect(() => {
        reset({
            seasonName: season?.name,
            seasonStart: new Date(season.dateStart),
            seasonFinish: new Date(season.dateFinish),
        })
    }, [season])

    return (
        <Template>
            <Head>
                <title>Dribblr | Edit Your Season</title>
            </Head>
            <Container heading="Update Season" minH="unset" w="unset !important">
                <DeleteConfirm
                    isOpen={isOpen}
                    onClose={onClose}
                    onDelete={deleteSeason}
                    toDeleteText="Season"
                />
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
                            placeHolder={moment(season?.dateStart).format('DD/MM/YYYY')}
                        />
                        <DatePicker
                            control={control}
                            label="End date"
                            name="seasonFinish"
                            placeHolder={moment(season?.dateFinish).format('DD/MM/YYYY')}
                        />
                    </HStack>
                    <HStack spacing="0.5rem">
                        <FormButton onClick={() => router.back()}>Back</FormButton>
                        <FormButton
                            type="submit"
                            color="black"
                            bg="orange"
                            isLoading={editIsLoading || editIsSuccess}
                        >
                            Update
                        </FormButton>
                    </HStack>
                    <HStack>
                        <FormButton bg="red" onClick={() => setIsOpen(true)}>
                            Delete Season
                        </FormButton>
                    </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default edit
