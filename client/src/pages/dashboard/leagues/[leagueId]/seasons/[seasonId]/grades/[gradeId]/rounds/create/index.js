import React from 'react'
import Head from 'next/head'
import { useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, Box, useToast, Text, VStack, FormLabel } from '@chakra-ui/react'
import { FormButton, Input } from 'components/Form'
import { useRouter } from 'next/router'
import { useCreateSeasonGrade, useMediaQuerySSR, useTeams } from 'hooks'
import { createErrorMessage } from 'utils'
import { Toast } from 'components'
import { TeamCapsule, SearchInput } from 'components/Dashboard/League/Rounds'
import TeamSelectPage from 'components/Dashboard/League/Rounds/TeamSelectPage'
import DatePicker from 'components/Form/DatePicker'

const generateFixturesSchema = yup.object().shape({
    numRounds: yup.number().min(1).max(50).required(),
    datesAndLocations: yup.array().of(
        yup.object().shape({
            day: yup.string().required(),
            time: yup.string().required(),
            locationName: yup.string().required(),
        })
    ),
})

const index = () => {
    const router = useRouter()
    const toast = useToast()
    const [showTeamsPage, setShowTeamsPage] = React.useState(false)
    const [selectedTeams, setSelectedTeams] = React.useState([])

    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(generateFixturesSchema),
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'datesAndLocations',
    })

    const handleNextPage = () => {
        if (selectedTeams.length >= 2) {
            setShowTeamsPage(false)
        } else {
            toast({
                render: () => <Toast title="Please select 2 or more teams" type="error" />,
                position: 'top',
                duration: 5000,
            })
        }
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Template>
            <Head>
                <title>Dribblr | Generate matches</title>
            </Head>
            <Container heading="Generate Matches" minH="400px" maxH="600px" xw={['95%', '60%']}>
                {showTeamsPage ? (
                    <TeamSelectPage
                        selectedTeams={selectedTeams}
                        setSelectedTeams={setSelectedTeams}
                        handleNextPage={handleNextPage}
                    />
                ) : (
                    <VStack
                        w="100%"
                        alignItems="flex-start"
                        as="form"
                        onSubmit={handleSubmit(onSubmit)}
                        maxH="400px"
                        overflowY="auto"
                    >
                        <Input
                            placeholder="Enter number"
                            {...register('numRounds')}
                            label="Number of rounds"
                            error={errors.numRounds?.message}
                            type="number"
                            w="300px"
                        />
                        <FormLabel fontSize="1.25rem">Day/time and location slots</FormLabel>
                        {fields.map((item, index) => {
                            return (
                                <HStack key={item.id} spacing="0.5rem" align="center" w="100%">
                                    <Input
                                        type="select"
                                        placeholder="Select a day for the match"
                                        error={errors.datesAndLocations?.[index]?.day?.message}
                                        {...register(`datesAndLocations.${index}.day`)}
                                    >
                                        <option value="0">Monday</option>
                                        <option value="1">Tuesday</option>
                                        <option value="2">Wednesday</option>
                                        <option value="3">Thursday</option>
                                        <option value="4">Friday</option>
                                        <option value="5">Saturday</option>
                                        <option value="6">Sunday</option>
                                    </Input>
                                    <DatePicker
                                        control={control}
                                        name={`datesAndLocations.${index}.time`}
                                        placeholder="Enter the match time"
                                        showTimeSelect
                                        showPopperArrow={false}
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                    />
                                    <Input
                                        bg="white"
                                        borderRadius="1rem"
                                        placeholder="Enter the match location"
                                        error={
                                            errors.datesAndLocations?.[index]?.locationName?.message
                                        }
                                        {...register(`datesAndLocations.${index}.locationName`)}
                                    />
                                    <FormButton type="button" onClick={() => remove(index)}>
                                        Delete
                                    </FormButton>
                                </HStack>
                            )
                        })}
                        <FormButton
                            type="button"
                            inverse
                            border="1px solid black"
                            borderColor="greyText.500"
                            fontWeight="normal"
                            alignSelf="center"
                            onClick={() => {
                                append({})
                            }}
                        >
                            Add Slot
                        </FormButton>
                        <HStack alignSelf="center" mb="1rem">
                            <FormButton onClick={() => setShowTeamsPage(true)}>BACK</FormButton>
                            <FormButton bg="orange" inverse type="submit">
                                SUBMIT
                            </FormButton>
                        </HStack>
                    </VStack>
                )}
            </Container>
        </Template>
    )
}

export default index
