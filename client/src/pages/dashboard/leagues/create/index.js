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
import { useCreateLeague } from 'hooks'

const createLeagueSchema = yup.object().shape({
    leagueName: yup
        .string()
        .required("The League's name is required")
        .max(20, 'League Name must be at most 20 characters'),
    organisationName: yup
        .string()
        .required('Please enter the name of the Organisation running this League'),
})

const index = () => {
    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createLeagueSchema),
    })

    const { mutate, isLoading } = useCreateLeague({
        onSuccess: (response) => {
            router.push(
                new URL(`${response?.data?.data?.name}/seasons`, window.location.href).pathname
            )
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
            <Container heading="Create a new League" minH="unset" w="unset !important">
                <VStack
                    marginleft={['0', '2rem']}
                    as="form"
                    spacing="2rem"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        label="League name"
                        placeholder="League name"
                        error={errors.leagueName?.message}
                        {...register('leagueName')}
                        isRequired
                    />
                    <Input
                        label="Organisation name"
                        placeholder="Organisation name"
                        error={errors.organisationName?.message}
                        {...register('organisationName')}
                        isRequired
                    />
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

export default index
