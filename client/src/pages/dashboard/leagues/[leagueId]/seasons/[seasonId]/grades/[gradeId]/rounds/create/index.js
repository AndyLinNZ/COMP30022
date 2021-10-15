import React from 'react'
import Head from 'next/head'
import { useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, Box, useToast, Text, VStack, FormLabel } from '@chakra-ui/react'
import { FormButton, Input } from 'components/Form'
import { useRouter } from 'next/router'
import { useMediaQuerySSR, useUserDetails } from 'hooks'
import { Toast } from 'components'
import TeamSelectPage from 'components/Dashboard/League/Rounds/TeamSelectPage'
import DatePicker from 'components/Form/DatePicker'
import { requiredText } from 'utils/constants'
import moment from 'moment'
import { getSeasonFromUser } from 'utils'
import useCreateFixtures from 'hooks/useCreateFixtures'

const generateFixturesSchema = yup.object().shape({
    numRounds: yup.number().min(1).max(50).required(requiredText),
    datesAndLocations: yup.array().of(
        yup.object().shape({
            day: yup.string().required(requiredText),
            time: yup.string().required(requiredText),
            locationName: yup.string().required(requiredText),
        })
    ),
})

const getDateFromWeekAfter = (seasonStartDate, day, time) => {
    let date = moment(seasonStartDate).day(moment(seasonStartDate).day() - day > 0 ? 7 + day : day)
    date = date.set({
        hour: time.get('hour'),
        minute: time.get('minute'),
    })
    return date.toISOString()
}

const generateResponse = (teams, formData, seasonStartDate) => {
    const { numRounds, datesAndLocations } = formData
    return {
        teamIds: teams.map((team) => team.id),
        numRounds,
        datesAndLocations: datesAndLocations?.map(({ day, time, locationName }) => {
            return {
                dateStart: getDateFromWeekAfter(seasonStartDate, parseInt(day), moment(time)),
                locationName,
            }
        }),
    }
}

const createErrorMessage = (msg) => {
    switch (msg) {
        case 'Dates and locations are invalid':
            return 'Date(s) or location(s) entered are invalid'
        case 'numRounds is invalid':
            return 'The number of rounds entered is invalid'
        case 'numRounds cannot fit within the season':
            return 'The number of rounds (weeks) entered cannot fit within the length of the season'
        default:
            return msg
    }
}

const index = () => {
    const router = useRouter()
    const isDesktop = useMediaQuerySSR(1200)
    const isMobile = !useMediaQuerySSR(600)
    const toast = useToast()
    const { user } = useUserDetails()
    const season = getSeasonFromUser(user)
    const [showTeamsPage, setShowTeamsPage] = React.useState(true)
    const [selectedTeams, setSelectedTeams] = React.useState([])

    const bottomRef = React.useRef()

    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(generateFixturesSchema),
        defaultValues: {
            numRounds: 10,
            datesAndLocations: [{}],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'datesAndLocations',
    })

    const { mutate, isLoading } = useCreateFixtures({
        onSuccess: () => {
            router.push(
                window.location.pathname
                    .split('/')
                    .slice(0, window.location.pathname.split('/').length - 1)
                    .join('/')
            )
        },
        onError: (error) => {
            const errMsg = error.response?.data?.error || 'Error logging in'
            toast({
                render: () => <Toast title={createErrorMessage(errMsg)} type="error" />,
                position: 'top',
                duration: 5000,
            })
        },
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

    const calcMaxRounds = () => {
        if (!season) return 0
        const { dateStart, dateFinish } = season
        return moment(dateFinish).diff(moment(dateStart), 'week')
    }

    const onSubmit = (data) => {
        mutate(generateResponse(selectedTeams, data, season?.dateStart))
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
                        h="400px"
                        overflowY="auto"
                        overflowX="hidden"
                        mb="2.5rem"
                    >
                        <Input
                            placeholder="Enter number"
                            {...register('numRounds')}
                            label={`Number of rounds (max ${calcMaxRounds()})`}
                            error={errors.numRounds?.message}
                            type="number"
                            w="300px"
                        />
                        <FormLabel fontSize="1.25rem">Day/time and location slots</FormLabel>
                        {fields.map((item, index) => {
                            return isDesktop ? (
                                <HStack key={item.id} spacing="0.5rem" alignItems="center" w="100%">
                                    <Input
                                        type="select"
                                        placeholder="Select a day for the match"
                                        error={errors.datesAndLocations?.[index]?.day?.message}
                                        {...register(`datesAndLocations.${index}.day`)}
                                    >
                                        <option value="1">Monday</option>
                                        <option value="2">Tuesday</option>
                                        <option value="3">Wednesday</option>
                                        <option value="4">Thursday</option>
                                        <option value="5">Friday</option>
                                        <option value="6">Saturday</option>
                                        <option value="7">Sunday</option>
                                    </Input>
                                    <DatePicker
                                        control={control}
                                        name={`datesAndLocations.${index}.time`}
                                        placeholder="Enter Time"
                                        showTimeSelect
                                        showPopperArrow={false}
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                    />
                                    <Text mt="0.5rem !important" fontSize="1.25rem">
                                        at
                                    </Text>
                                    <Input
                                        bg="white"
                                        borderRadius="1rem"
                                        placeholder="Enter the match location"
                                        error={
                                            errors.datesAndLocations?.[index]?.locationName?.message
                                        }
                                        {...register(`datesAndLocations.${index}.locationName`)}
                                    />
                                    <FormButton
                                        type="button"
                                        inverse
                                        fontWeight="bold"
                                        fontSize="1.25rem"
                                        mt="0.25rem !important"
                                        onClick={() => remove(index)}
                                    >
                                        X
                                    </FormButton>
                                </HStack>
                            ) : (
                                <Box pos="relative" w="100%">
                                    <VStack
                                        key={item.id}
                                        alignItems="flex-start"
                                        w={isMobile ? '90%' : '90%'}
                                    >
                                        <Box
                                            display="grid"
                                            gridTemplateColumns="6fr 3fr 1fr"
                                            gridColumnGap="0.5rem"
                                            alignItems="center"
                                            w="100%"
                                        >
                                            <Input
                                                type="select"
                                                placeholder="Select a day for the match"
                                                error={
                                                    errors.datesAndLocations?.[index]?.day?.message
                                                }
                                                {...register(`datesAndLocations.${index}.day`)}
                                                minW="unset"
                                            >
                                                <option value="1">Monday</option>
                                                <option value="2">Tuesday</option>
                                                <option value="3">Wednesday</option>
                                                <option value="4">Thursday</option>
                                                <option value="5">Friday</option>
                                                <option value="6">Saturday</option>
                                                <option value="7">Sunday</option>
                                            </Input>
                                            <DatePicker
                                                control={control}
                                                name={`datesAndLocations.${index}.time`}
                                                placeholder="Enter Time"
                                                showTimeSelect
                                                showPopperArrow={false}
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Time"
                                                dateFormat="h:mm aa"
                                            />
                                            <Text
                                                mt="0.5rem !important"
                                                fontSize="1.25rem"
                                                textAlign="center"
                                            >
                                                at
                                            </Text>
                                        </Box>
                                        <Input
                                            bg="white"
                                            borderRadius="1rem"
                                            minW="unset"
                                            placeholder="Enter the match location"
                                            error={
                                                errors.datesAndLocations?.[index]?.locationName
                                                    ?.message
                                            }
                                            {...register(`datesAndLocations.${index}.locationName`)}
                                        />
                                    </VStack>
                                    <FormButton
                                        type="button"
                                        inverse
                                        fontWeight="bold"
                                        fontSize="1.25rem"
                                        mt="0.25rem !important"
                                        pos="absolute"
                                        right="-0.5rem"
                                        top="50%"
                                        transform="translateY(-50%)"
                                        width="30px"
                                        onClick={() => remove(index)}
                                    >
                                        X
                                    </FormButton>
                                </Box>
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
                                setTimeout(() => {
                                    bottomRef.current.scrollIntoView()
                                }, 1)
                            }}
                        >
                            Add Slot
                        </FormButton>
                        <div ref={bottomRef} />
                        <HStack
                            pos="absolute"
                            bottom="1rem"
                            left="50%"
                            transform="translateX(-50%)"
                        >
                            <FormButton onClick={() => setShowTeamsPage(true)}>BACK</FormButton>
                            <FormButton bg="orange" inverse type="submit" isLoading={isLoading}>
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
