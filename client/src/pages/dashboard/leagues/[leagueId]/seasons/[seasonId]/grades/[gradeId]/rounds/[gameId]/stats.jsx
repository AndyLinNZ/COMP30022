import React from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Template, Container } from 'components/Dashboard'
import { HStack, Center, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { FormButton, Input } from 'components/Form'
import { useRouter } from 'next/router'
import { useGame, useEditGameStats } from 'hooks'
//
// https://github.com/jquense/yup/issues/130#issuecomment-578392176
const mapRules = (map, rule) => Object.keys(map).reduce((newMap, key) => ({...newMap, [key]: rule}), {});
// https://github.com/jquense/yup/issues/1330#issuecomment-901170542
const nullableNum = () => yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable()
const playersStatsSchema = yup.object().shape({
    team1: yup.lazy(map => yup.object(
        mapRules(map, yup.object({
            points: nullableNum(),
            assists: nullableNum(),
            fouls: nullableNum(),
        }))
    )),
    team2: yup.lazy(map => yup.object(
        mapRules(map, yup.object({
            points: nullableNum(),
            assists: nullableNum(),
            fouls: nullableNum(),
        }))
    ))
})

const index = () => {
    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(playersStatsSchema),
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    const TEAM1_PLAYERS_MOCK = [{ _id: 'abc123', name: 't1 player1' }, { _id: 'abc124', name: 't1 player2' }]
    const TEAM2_PLAYERS_MOCK = [{ _id: 'zzz123', name: 't2 player1' }, { _id: 'zzz124', name: 't2 player2' }]

    const PlayersTable = ({ players, teamNum }) => (
        <Table variant="striped" size="sm">
            <Thead>
                <Tr borderBottom="2px solid grey">
                    <Th minW="100px">PLAYER</Th>
                    <Th>POINTS</Th>
                    <Th>ASSISTS</Th>
                    <Th>FOULS</Th>
                </Tr>
            </Thead>
            <Tbody>
                {players.map((player) => (
                    <Tr key={player._id}>
                        <Td>{player.name}</Td>
                        <Td>
                            <Input
                                error={errors[teamNum]?.[player._id]?.points?.message}
                                {...register(`${teamNum}.${player._id}.points`)}
                                border="none"
                                borderRadius="0"
                                background="transparent"
                                borderBottom="1px solid grey"
                                minW="70px"
                            />
                        </Td>
                        <Td>
                            <Input
                                error={errors[teamNum]?.[player._id]?.assists?.message}
                                {...register(`${teamNum}.${player._id}.assists`)}
                                border="none"
                                borderRadius="0"
                                background="transparent"
                                borderBottom="1px solid grey"
                                minW="70px"
                            />
                        </Td>
                        <Td>
                            <Input
                                error={errors[teamNum]?.[player._id]?.fouls?.message}
                                {...register(`${teamNum}.${player._id}.fouls`)}
                                border="none"
                                borderRadius="0"
                                background="transparent"
                                borderBottom="1px solid grey"
                                minW="70px"
                            />
                        </Td>
                    </Tr>
                ))}
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
                                <Tab mr="1rem">Lygon Kangaroos</Tab>
                                <Tab ml="1rem">Brunswick Emus</Tab>
                            </Center>
                        </TabList>
                        <TabPanels w="100%">
                            <TabPanel w="100%">
                                <PlayersTable players={TEAM1_PLAYERS_MOCK} teamNum="team1"/> 
                            </TabPanel>
                            <TabPanel w="100%">
                                <PlayersTable players={TEAM2_PLAYERS_MOCK} teamNum="team2" /> 
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <HStack alignSelf="center" mb="1rem">
                        <FormButton onClick={router.back}>BACK</FormButton>
                        <FormButton bg="orange" inverse type="submit">
                            SUBMIT
                        </FormButton>
                    </HStack>
                </VStack>
            </Container>
        </Template>
    )
}

export default index
