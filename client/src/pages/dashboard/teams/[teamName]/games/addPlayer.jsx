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
import { useAddPlayerToTeam } from 'hooks'

const addPlayerSchema = yup.object().shape({
    playerName: yup
        .string()
        .required("The Player's name is required")
        .max(20, 'Player Name must be at most 20 characters'),
})

const addPlayer = () => {
    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(addPlayerSchema),
    })

    const { mutate, isLoading } = useAddPlayerToTeam({
        onSuccess: (response) => {
            router.push(new URL(`${response?.data?.data?.name}`, window.location.href).pathname)
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
            <Container heading="Add a Player" minH="unset" w="unset !important">
                <VStack
                    marginleft={['0', '2rem']}
                    as="form"
                    spacing="2rem"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        label="Player name"
                        placeholder="Player name"
                        error={errors.playerName?.message}
                        {...register('playerName')}
                        isRequired
                    />
                    <HStack spacing="0.5rem">
                        <FormButton onClick={() => router.push(appPaths.DASHBOARD_TEAMS_PATH)}>
                            Back
                        </FormButton>
                        <FormButton type="submit" color="black" bg="orange" isLoading={isLoading}>
                            Add
                        </FormButton>
                    </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default addPlayer