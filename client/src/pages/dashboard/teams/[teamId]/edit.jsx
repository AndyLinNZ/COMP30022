import React from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import {
    Editable,
    EditablePreview,
    EditableInput,
    CloseButton,
    FormLabel,
    Stack,
    HStack,
    VStack,
    useToast,
} from '@chakra-ui/react'
import Input from 'components/Form/Input'
import FormButton from 'components/Form/FormButton'
import { appPaths } from 'utils/constants'
import { useRouter } from 'next/router'
import { useTeam, useEditTeam, useDeletePlayersFromTeam, useMediaQuerySSR } from 'hooks'
import { createErrorMessage } from 'utils'
import { Toast } from 'components'

const editTeamSchema = yup.object().shape({
    teamName: yup
        .string()
        .required("The Team's name is required")
        .max(20, 'Team Name must be at most 20 characters'),
})

const edit = () => {
    const router = useRouter()
    const teamId = router.query?.teamId
    const teamObject = useTeam(teamId)
    const team = teamObject?.team
    const toast = useToast()
    const isDesktop = useMediaQuerySSR(900)

    const [selected, setSelected] = React.useState({ playerIds: [] })
    const [players, setPlayers] = React.useState([])
    React.useEffect(() => {
        if (team) {
            setPlayers(team?.players)
        }
    }, [team])

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

    const { mutate: deletePlayersFromTeam } = useDeletePlayersFromTeam({
        onSuccess: () => {
            router.push(appPaths.DASHBOARD_TEAMS_PATH)
        },
        onError: (error) => {
            const errMsg = error.response?.data?.error
            toast({
                render: () => (
                    <Toast
                        title={createErrorMessage(errMsg, 'Error deleting Players!')}
                        type="error"
                    />
                ),
                position: 'top',
                duration: 5000,
            })
        },
    })

    const onSubmit = (data) => {
        selected.playerIds.length > 0 && deletePlayersFromTeam(selected)
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
                    <Stack spacing={3} overflow="auto" maxHeight="250px">
                        <FormLabel fontSize="1.25rem">Current players</FormLabel>
                        {players.map((player) => {
                            return (
                                <HStack key={player?.id} spacing="0.5rem" align="center">
                                    <Editable
                                        minW={isDesktop ? '320px' : '160px'}
                                        size="sm"
                                        defaultValue={player?.name}
                                        isDisabled="true"
                                    >
                                        <EditablePreview />
                                        <EditableInput />
                                    </Editable>
                                    <CloseButton
                                        size="sm"
                                        onClick={() => {
                                            setSelected({
                                                playerIds: selected.playerIds.concat([player?.id]),
                                            })
                                            const newPlayers = players.filter(
                                                (p) => p.id !== player.id
                                            )
                                            setPlayers(newPlayers)
                                        }}
                                    />
                                </HStack>
                            )
                        })}
                    </Stack>
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
                </VStack>
            </Container>
        </Template>
    )
}

export default edit
