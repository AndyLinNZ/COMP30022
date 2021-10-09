import React from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, VStack, useToast, Text } from '@chakra-ui/react'
import { DatePicker, FormButton, Input } from 'components/Form'
import { useRouter } from 'next/router'
import { useGame, useEditGame } from 'hooks'
import { createErrorMessage } from 'utils'
import moment from 'moment'
import Toast from 'components/Toast'

const editGameSchema = yup.object().shape({
    newLocationName: yup.string().required('The match location is required'),
    newStart: yup.date().default(null).required('The match time is required'),
})

const edit = () => {
    const router = useRouter()
    const toast = useToast()
    const { game } = useGame()

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        control,
    } = useForm({
        resolver: yupResolver(editGameSchema),
    })

    const {
        mutate: editGame,
        editIsLoading,
        editIsSuccess,
    } = useEditGame({
        onSuccess: () => {
            router.push(
                window.location.pathname
                    .split('/')
                    .slice(0, window.location.pathname.split('/').length - 2)
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
                            '',
                            'Error editing Game'
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
        editGame(Object.assign({ _id: game._id }, data))
    }

    React.useEffect(() => {
        if (game) {
            setValue('newLocationName', game.locationName)
            setValue('newStart', new Date(game.dateStart))
        }
    }, [game, setValue])

    return (
        <Template>
            <Head>
                <title>Dribblr | Edit Your Match</title>
            </Head>
            <Container heading="Update Match" minH="unset" w="unset !important">
                <VStack
                    marginleft={['0', '2rem']}
                    as="form"
                    spacing="2rem"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {game &&
                        <VStack>
                            <Text fontWeight="bold">{game.team1.team.name}</Text>
                            <Text>vs.</Text>
                            <Text fontWeight="bold">{game.team2.team.name}</Text>
                        </VStack>
                    }
                    <Input
                        label="Match location"
                        placeholder={game?.locationName}
                        error={errors.newLocationName?.message}
                        {...register('newLocationName')}
                        width="100%"
                    />
                    <DatePicker
                        control={control}
                        label="Match time"
                        name="newStart"
                        placeHolder={moment(game?.dateStart).format('DD/MM/YYYY h:mm aa')}
                        dateFormat="dd/MM/yyyy h:mm aa"
                        showTimeInput
                    />
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
                </VStack>
            </Container>
        </Template>
    )
}

export default edit
