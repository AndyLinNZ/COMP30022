import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, VStack } from '@chakra-ui/react'
import { FormButton, Input } from 'components/Form'
import { appPaths } from 'utils/constants'
import { useRouter } from 'next/router'
import { useCreateSeasonGrade } from 'hooks'
import { Checkbox } from "@chakra-ui/react"

const createGradeSchema = yup.object().shape({
    gradeName: yup
        .string()
        .required("The Season's name is required")
        .max(20, 'Season Name must be at most 20 characters'),
    numberOfRounds: yup
        .number()
        .typeError("Please enter numbers only")
        .required("The number of rounds for this game is required")
        .min(1, 'There must be at least 1 round in the grade'),
})

const create = () => {
    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createGradeSchema),
    })

    const { mutate, isLoading } = useCreateSeasonGrade({
        onSuccess: (response) => {
            router.push(appPaths.DASHBOARD_LEAGUES_PATH)
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
            <Container heading="Create a new Grade" minH="unset" w="unset !important">
                <VStack
                    marginleft={['0', '2rem']}
                    as="form"
                    spacing="2rem"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        label="Grade name"
                        placeholder="Enter your grade name"
                        error={errors.gradeName?.message}
                        {...register('gradeName')}
                        isRequired
                        width="100%"
                    />
                    <HStack w="100%">
                        <Input
                            label="Number of rounds"
                            placeholder="Enter a number"
                            error={errors.numberOfRounds?.message}
                            {...register('numberOfRounds')}
                            isRequired
                            width="50%"
                        />
                        <Checkbox spacing="1rem" size="lg" colorScheme="black">Include Semi Finals and Grand Finals?</Checkbox>
                    </HStack>

                    <HStack spacing="0.5rem">
                        <FormButton onClick={() => router.push((window.location.pathname.split("/")).slice(0, (window.location.pathname.split("/")).length-1).join("/"))}>
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
