import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import Head from 'next/head'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { CloseButton, HStack, VStack, FormLabel, Stack, useToast } from '@chakra-ui/react'
import Input from 'components/Form/Input'
import FormButton from 'components/Form/FormButton'
import { appPaths } from 'utils/constants'
import { useRouter } from 'next/router'
import { useUserDetails, useAddPlayerToTeam, useMediaQuerySSR } from 'hooks'
import { getTeamFromUser, createErrorMessage } from 'utils'
import { Toast } from 'components'

const addPlayerSchema = yup.object().shape({
    playerNames: yup.array().of(
        yup.object().shape({
            playerName: yup
                .string()
                .required("The Player's name is required")
                .max(20, 'Player Name must be at most 20 characters'),
        })
    ),
})

const add = () => {
    const router = useRouter()
    const { user } = useUserDetails()
    const team = getTeamFromUser(user)
    const isDesktop = useMediaQuerySSR(900)

    const toast = useToast()
    const {
        mutate: addPlayerToTeam,
        isLoading,
        isSuccess,
    } = useAddPlayerToTeam({
        onSuccess: () => {
            toast({
                render: () => <Toast title="Successfully added players" type="success" />,
                position: 'top',
                duration: 5000,
            })
            router.push(appPaths.DASHBOARD_TEAMS_PATH)
        },
        onError: (error) => {
            const errMsg = error.response?.data?.error
            toast({
                render: () => (
                    <Toast
                        title={createErrorMessage(
                            errMsg,
                            'Unable to add Players with the same name as existing Players',
                            'Error adding Players'
                        )}
                        type="error"
                    />
                ),
                position: 'top',
                duration: 5000,
            })
        },
    })

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(addPlayerSchema),
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'playerNames',
    })

    const onSubmit = (data) => {
        addPlayerToTeam(data)
    }

    return (
        <Template>
            <Head>
                <title>Dribblr | Add a Player</title>
            </Head>
            <Container heading={`Add Players to ${team?.name}`} minH="unset" w="unset !important">
                <VStack
                    marginleft={['0', '2rem']}
                    as="form"
                    spacing="2rem"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Stack spacing={3} overflow="auto" maxHeight="250px">
                        <FormLabel fontSize="1.25rem">New players to add</FormLabel>
                        {fields.map((item, index) => {
                            return (
                                <HStack key={item.id} spacing="0.5rem" align="center">
                                    <Input
                                        minW={isDesktop ? '320px' : '160px'}
                                        size="sm"
                                        bg="white"
                                        borderRadius="1rem"
                                        placeholder="Player name"
                                        error={errors.playerNames?.[index]?.playerName?.message}
                                        {...register(`playerNames.${index}.playerName`)}
                                    />
                                    <CloseButton size="sm" onClick={() => remove(index)} />
                                </HStack>
                            )
                        })}
                    </Stack>
                    <HStack spacing="0.5rem">
                        <FormButton onClick={() => router.push(appPaths.DASHBOARD_TEAMS_PATH)}>
                            Back
                        </FormButton>
                        <FormButton
                            type="button"
                            color="black"
                            bg="lightgray"
                            onClick={() => {
                                append({ playerName: '' })
                            }}
                        >
                            Add
                        </FormButton>
                    </HStack>
                    <HStack>
                        <FormButton
                            type="submit"
                            color="black"
                            bg="orange"
                            isLoading={isLoading || isSuccess}
                        >
                            Confirm
                        </FormButton>
                    </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default add
