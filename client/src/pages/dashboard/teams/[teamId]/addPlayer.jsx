import React from 'react'
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, VStack, InputGroup, InputRightElement, FormLabel, Stack } from '@chakra-ui/react'
import Input from 'components/Form/Input'
import FormButton from 'components/Form/FormButton'
import { appPaths } from 'utils/constants'
import { useRouter } from 'next/router'
import { useUserDetails, useAddPlayerToTeam } from 'hooks'
import { getTeamFromUser } from 'utils'

const addPlayerSchema = yup.object().shape({
    playerNames: yup.array().of(
        yup.object().shape({
            playerName: yup
            .string()
            .required("The Player's name is required")
            .max(20, 'Player Name must be at most 20 characters')
            .min(1, 'You must provide a Player Name')
        })
    )
})

const addPlayer = () => {
    const router = useRouter()
    const { user } = useUserDetails()
    const team = getTeamFromUser(user)

    const { mutate: addPlayerToTeam, isLoading, isSuccess } = useAddPlayerToTeam({
        onSuccess: () => {
            router.push(appPaths.DASHBOARD_TEAMS_PATH)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    const { register, control, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(addPlayerSchema)
    })

    const { fields, append, remove } = useFieldArray(
      {
        control,
        name: "playerNames"
      }
    )

    const onSubmit = (data) => {
        console.log("data", data)
        addPlayerToTeam(data)
    }

    return (
        <Template>
            <Container heading={`Add Players to ${team?.name}`} minH="unset" w="unset !important">
                <VStack
                    marginleft={['0', '2rem']}
                    as="form"
                    spacing="2rem"
                    onSubmit={handleSubmit(onSubmit)}
                >
                  <Stack spacing={3}>
                    <FormLabel fontSize="1.25rem">Players to add</FormLabel>
                    {fields.map((item, index) => {
                      return (   
                        <HStack key={item.id} spacing="0.5rem" align="center">               
                          <Input
                            minW="320px"
                            size="sm"
                            bg="white"
                            borderRadius="1rem"
                            placeholder="Player name"
                            error={errors.playerNames?.message}
                            {...register(`playerNames.${index}.playerName`)}
                          />
                          <FormButton type="button" onClick={() => remove(index)}>
                            Delete
                          </FormButton>
                        </HStack>
                      )
                    })}
                  </Stack>
                  <HStack spacing="0.5rem">
                    <FormButton onClick={() => router.push(appPaths.DASHBOARD_TEAMS_PATH)}>
                        Back
                    </FormButton>
                    <FormButton type="button" color="black" bg="lightgray"
                      onClick={() => {
                        append({playerName: ""});
                    }}>
                        Add
                    </FormButton>
                  </HStack>
                  <HStack>
                    <FormButton type="submit" color="black" bg="orange" isLoading={isLoading || isSuccess}>
                        Confirm
                    </FormButton>
                  </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default addPlayer