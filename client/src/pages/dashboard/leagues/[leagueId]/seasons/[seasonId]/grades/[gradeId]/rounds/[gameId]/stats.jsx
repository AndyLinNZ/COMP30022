import React from 'react'
import Head from 'next/head'
import { useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import {
    useToast,
    HStack,
    Center,
    VStack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react'
import { FormButton, Input } from 'components/Form'
import { Toast } from 'components'
import { useRouter } from 'next/router'
import { useGame, useEditGameStats } from 'hooks'

const STATS_FIELDS = ['points', 'assists', 'steals']

// https://github.com/jquense/yup/issues/130#issuecomment-578392176
const mapRules = (map, rule) =>
    Object.keys(map).reduce((newMap, key) => ({ ...newMap, [key]: rule }), {})
// https://github.com/jquense/yup/issues/1330#issuecomment-901170542
const nullableNum = () =>
    yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .nullable()
        .min(0, 'Input must be a non-negative integer')
const playersStatsSchema = yup.object().shape({
    team1: yup.lazy((map) =>
        yup.object(
            mapRules(
                map,
                yup.object(Object.fromEntries(STATS_FIELDS.map((k) => [k, nullableNum()])))
            )
        )
    ),
    team2: yup.lazy((map) =>
        yup.object(
            mapRules(
                map,
                yup.object(Object.fromEntries(STATS_FIELDS.map((k) => [k, nullableNum()])))
            )
        )
    ),
})

const index = () => {
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
        resolver: yupResolver(playersStatsSchema),
    })

    const { mutate, isLoading, isSuccess } = useEditGameStats({
        onSuccess: () => {
            toast({
                render: () => <Toast title="Successfully updated match results" type="success" />,
                position: 'top',
                duration: 5000,
            })
            // TODO: redirect to match details page?
        },
        onError: (error) => {
            const errMsg = error.response?.data?.error
            toast({
                render: () => <Toast title={errMsg} type="error" />,
                position: 'top',
                duration: 5000,
            })
        },
    })

    React.useEffect(() => {
        if (!game) return
        game.team1.playersStats.forEach((stats) => {
            STATS_FIELDS.forEach((s) => {
                if (stats[s]) setValue(`team1.${stats.playerId}.${s}`, stats[s])
            })
        })
        game.team2.playersStats.forEach((stats) => {
            STATS_FIELDS.forEach((s) => {
                if (stats[s]) setValue(`team2.${stats.playerId}.${s}`, stats[s])
            })
        })
    }, [game, setValue])

    const onSubmit = (data) => {
        data._id = game._id
        mutate(data)
    }

    const calculateTotal = (S, s) => Object.values(S).reduce((a, v) => a + (parseInt(v[s]) || 0), 0)

    const Totals = ({ control, teamNum }) => {
        const data = useWatch({ control, name: teamNum })
        if (!data) return null
        return STATS_FIELDS.map((s) => (
            <Td key={teamNum + s} paddingLeft="1.75rem">
                {calculateTotal(data, s)}
            </Td>
        ))
    }

    const inputStyle = {
        border: 'none',
        borderRadius: '0',
        background: 'transparent',
        borderBottom: 'none',
        minW: '70px',
        size: 'sm',
    }
    const PlayersTable = ({ players, teamNum }) => (
        <Table variant="striped" size="sm">
            <Thead>
                <Tr borderBottom="2px solid grey">
                    <Th minW="100px">PLAYER</Th>
                    {STATS_FIELDS.map((s) => (
                        <Th key={s}>{s.toUpperCase()}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {players.map((player) => (
                    <Tr key={player._id}>
                        <Td>{player.name}</Td>
                        {STATS_FIELDS.map((s) => (
                            <Td key={player._id + s}>
                                <Input
                                    error={errors[teamNum]?.[player._id]?.[s]?.message}
                                    type="number"
                                    {...register(`${teamNum}.${player._id}.${s}`)}
                                    {...inputStyle}
                                />
                            </Td>
                        ))}
                    </Tr>
                ))}
                <Tr borderTop="2px solid grey">
                    <Td>TOTALS</Td>
                    <Totals control={control} teamNum={teamNum} />
                </Tr>
            </Tbody>
        </Table>
    )

    return (
        <Template>
            <Head>
                <title>Dribblr | Edit match results</title>
            </Head>
            <Container heading="Edit Match Results" minH="400px" maxH="600px" xw={['95%', '60%']}>
                <VStack
                    w="100%"
                    alignItems="flex-start"
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                    maxH="400px"
                    overflowY="auto"
                >
                    <Tabs variant="soft-rounded" colorScheme="gray" w="100%">
                        <TabList w="100%" paddingY="0.5rem" paddingX="1rem" color="greyText.500">
                            <Center w="100%">
                                <Tab mr="1rem">{game?.team1?.team?.name || 'Team 1'}</Tab>
                                <Tab ml="1rem">{game?.team2?.team?.name || 'Team 2'}</Tab>
                            </Center>
                        </TabList>
                        <TabPanels w="100%">
                            <TabPanel w="100%">
                                <PlayersTable
                                    players={game?.team1?.team?.players || []}
                                    teamNum="team1"
                                />
                            </TabPanel>
                            <TabPanel w="100%">
                                <PlayersTable
                                    players={game?.team2?.team?.players || []}
                                    teamNum="team2"
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <HStack alignSelf="center" mb="1rem">
                        <FormButton onClick={router.back}>BACK</FormButton>
                        <FormButton
                            bg="orange"
                            inverse
                            type="submit"
                            isLoading={isLoading || isSuccess}
                        >
                            SUBMIT
                        </FormButton>
                    </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default index
