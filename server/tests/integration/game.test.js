const setupTestEnv = require('./test-utils')
const League = require('../../models/league')
const Season = require('../../models/season')
const Grade = require('../../models/grade')
const Team = require('../../models/team')
const Round = require('../../models/round')
const Game = require('../../models/game')
const Player = require('../../models/player')
const supertest = require('supertest')
const initApp = require('../../app')
const app = initApp()
const request = supertest(app)

const env = {}
const setupOptions = { createDefaultUsers: true }
setupTestEnv('dribblrDB-game-test', env, setupOptions)

// set up test materials
const testLeague = {
    leagueName: 'Joshua Basketball Association',
    organisationName: 'JoshuaDubar'
}
const testSeason = {
    name: 'Summer 2020/2021',
    seasonStart: '2021-08-12T12:23:34.944Z',
    seasonFinish: '2021-08-24T12:23:34.944Z'
}
const testGrade = {
    name: 'Joshua Dubar Grade',
    difficulty: 'E',
    gender: 'female'
}
const testTeam1 = {
    name: 'jdubz1'
}

const testTeam2 = {
    name: 'josh2'
}

const testRound = {
    date: '2021-08-12T10:00:00.000Z',
}

const testGame = {
    dateStart: '2021-08-12T10:00:00.000Z',
    dateFinish: '2021-08-12T11:00:00.000Z',
    locationName: 'Josh Dubz Stadium',
    location: { type: 'Point', coordinates: [-22.22, 33.33] },
}

beforeAll(async () => {
    // add new test league object to database
    const newLeague = new League({
        name: testLeague.leagueName,
        organisation: testLeague.organisationName,
        creator: env.auth_tokens[0][0],
        admins: [env.auth_tokens[0][0], env.auth_tokens[1][0]],
        seasons: []
    })
    const league = await newLeague.save()

    // add a new season object to database
    const newSeason = new Season({
        name: testSeason.name,
        dateStart: testSeason.seasonStart,
        dateFinish: testSeason.seasonFinish,
        league: league._id,
        grades: []
    })
    const season = await newSeason.save()

    // add the new season as a season to the league
    league.seasons.push(season._id)
    await league.save()

    // add a new grade object to database
    const newGrade = new Grade({
        ...testGrade,
        teams: [],
        season: season._id
    })
    const grade = await newGrade.save()
    season.grades.push(grade._id)
    await season.save()

    // add 2 new team objects to database
    const newTeam1 = new Team({
        ...testTeam1,
        admin: env.auth_tokens[0][0],
        grades: [grade._id],
        players: []
    })
    const team1 = await newTeam1.save()

    const newTeam2 = new Team({
        ...testTeam2,
        admin: env.auth_tokens[0][0],
        grades: [grade._id],
        players: []
    })
    const team2 = await newTeam2.save()

    // add the new teams as teams to the grade
    grade.teams.push(team1._id)
    grade.teams.push(team2._id)
    await grade.save()

    // add a new round object to database
    const newRound = new Round({
        ...testRound,
        grade: grade._id
    })
    const round = await newRound.save()

    // add the new round as a round to the grade's fixture
    grade.fixture.push[round._id]
    await grade.save()

    // add a new game object to database
    const newGame = new Game({
        ...testGame,
        round: round._id,
        team1: {
            team: team1._id
        },
        team2: {
            team: team2._id
        }
    })
    const game = await newGame.save()

    // add the new game as a game to the round's fixture
    round.games.push[game._id]
    await round.save()

    // add 2 new player objects to database
    const newPlayer1 = new Player({
        name: 'joshua1',
        team: team1._id,
    })
    const player1 = await newPlayer1.save()

    const newPlayer2 = new Player({
        name: 'joshua2',
        team: team2._id,
    })
    const player2 = await newPlayer2.save()

    team1.players.push(player1._id)
    team2.players.push(player2._id)
    await team1.save()
    await team2.save()

    const team1_updateDetails = {}
    team1_updateDetails[player1._id] = { points: 69, assists: 3 }
    const team2_updateDetails = {}
    team2_updateDetails[player2._id] = { points: 44, assists: 0 }

    const updateGameDetails = {
        team1: team1_updateDetails,
        team2: team2_updateDetails,
    }

    const team1_updateDetails2 = {}
    team1_updateDetails2[player1._id] = { points: 123 }
    const team2_updateDetails2 = {}
    team2_updateDetails2[player2._id] = { assists: 10 }

    const updateGameDetails2 = {
        team1: team1_updateDetails2,
        team2: team2_updateDetails2,
    }

    

    env.game0_id = game._id.toString()
    env.round0_id = round._id.toString()
    env.team1_id = team1._id.toString()
    env.team2_id = team2._id.toString()
    env.player1_id = player1._id.toString()
    env.player2_id = player2._id.toString()
    env.test_update_game_details = updateGameDetails
    env.test_update_game_details2 = updateGameDetails2
})

describe('Integration Testing: finding games', () => {
    test('Should be able to find an existent game', async () => {
        const res = await request.get(`/api/game/${env.game0_id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.dateStart).toBe(testGame.dateStart)
        expect(res.body.data.dateFinish).toBe(testGame.dateFinish)
        expect(res.body.data.round).toBe(env.round0_id)
        expect(res.body.data.locationName).toBe('Josh Dubz Stadium')
        expect(res.body.data.location.type).toBe('Point')
        expect(res.body.data.location.coordinates).toStrictEqual([-22.22, 33.33])
        expect(res.body.data.team1.team).toBe(env.team1_id)
        expect(res.body.data.team2.team).toBe(env.team2_id)
    })

    test('Finding a game with a nonexistent id should return an error', async () => {
        const res = await request.get(`/api/game/${env.auth_tokens[0][0]}`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Game does not exist')
    })

    test('Finding a game with an invalid MongoDB object id should return an error', async () => {
        const res = await request.get('/api/game/1337')

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Game does not exist')
    })
})

describe('Integration Testing: updating games', () => {
    test('Updating a game with an invalid game id should return an error', async () => {
        const res = await request.patch(`/api/game/${env.auth_tokens[0][0]}`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send(env.test_update_game_details)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Game does not exist')
    })

    test('User should not be able to update a game if they are not league admin', async () => {
        const res = await request.patch(`/api/game/${env.game0_id}`)
            .set('Authorization', `Bearer ${env.auth_tokens[2][1]}`)
            .send(env.test_update_game_details)

        expect(res.statusCode).toBe(403)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('User is not an admin')
    })

    test('League admin should be able to update a game', async () => {
        const res = await request.patch(`/api/game/${env.game0_id}`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send(env.test_update_game_details)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data._id).toBe(env.game0_id)
        expect(res.body.data.team1.team).toBe(env.team1_id)
        expect(res.body.data.team2.team).toBe(env.team2_id)
        expect(res.body.data.team1.playersStats.length).toBe(1)
        expect(res.body.data.team2.playersStats.length).toBe(1)
        expect(res.body.data.team1.playersStats[0].playerId).toBe(env.player1_id)
        expect(res.body.data.team2.playersStats[0].playerId).toBe(env.player2_id)
        expect(res.body.data.team1.playersStats[0].points).toBe(env.test_update_game_details.team1[env.player1_id].points)
        expect(res.body.data.team2.playersStats[0].points).toBe(env.test_update_game_details.team2[env.player2_id].points)
        expect(res.body.data.team1.playersStats[0].assists).toBe(env.test_update_game_details.team1[env.player1_id].assists)
        expect(res.body.data.team2.playersStats[0].assists).toBe(env.test_update_game_details.team2[env.player2_id].assists)
    })

    test('Updating a game with existing results should properly update the results', async () => {
        const res = await request.patch(`/api/game/${env.game0_id}`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send(env.test_update_game_details2)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data._id).toBe(env.game0_id)
        expect(res.body.data.team1.team).toBe(env.team1_id)
        expect(res.body.data.team2.team).toBe(env.team2_id)
        expect(res.body.data.team1.playersStats.length).toBe(1)
        expect(res.body.data.team2.playersStats.length).toBe(1)
        expect(res.body.data.team1.playersStats[0].playerId).toBe(env.player1_id)
        expect(res.body.data.team2.playersStats[0].playerId).toBe(env.player2_id)
        expect(res.body.data.team1.playersStats[0].points).toBe(env.test_update_game_details2.team1[env.player1_id].points)
        expect(res.body.data.team2.playersStats[0].assists).toBe(env.test_update_game_details2.team2[env.player2_id].assists)
    })
})

describe('Integration Testing: updating dates and location of a game', () => {
    test('Updating a game with an invalid game id should return an error', async () => {
        const res = await request.patch(`/api/game/${env.auth_tokens[0][0]}/details`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send(env.test_update_game_details)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Game does not exist')
    })

    test('User should not be able to update the dates and location of a game if they are not league admin', async () => {
        const res = await request.patch(`/api/game/${env.game0_id}/details`)
            .set('Authorization', `Bearer ${env.auth_tokens[2][1]}`)
            .send(env.test_update_game_details)

        expect(res.statusCode).toBe(403)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('User is not an admin')
    })

    test('League admin should be able to update the location of a game with valid id', async () => {
        const res = await request.patch(`/api/game/${env.game0_id}/details`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                newLocationName: 'Joshua Dubz New Stadium',
                newLocation: {
                    type: 'Point',
                    coordinates: [22.33, 44.555]
                },
            })

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data._id).toBe(env.game0_id)
        expect(res.body.data.locationName).toBe('Joshua Dubz New Stadium')
        expect(res.body.data.location.type).toBe('Point')
        expect(res.body.data.location.coordinates).toStrictEqual([22.33, 44.555])
        expect(res.body.data.dateStart).toBe(testGame.dateStart)
        expect(res.body.data.dateFinish).toBe(testGame.dateFinish)
    })

    test('League admin should be able to update the dates and location of a game with valid id', async () => {
        const res = await request.patch(`/api/game/${env.game0_id}/details`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                newStart: '2021-08-12T12:23:34.944Z',
                newFinish: '2090-08-13T12:23:34.944Z',
                newLocationName: 'Joshua Dubz New Stadium',
                newLocation: {
                    type: 'Point',
                    coordinates: [22.33, 44.555]
                },
            })

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data._id).toBe(env.game0_id)
        expect(res.body.data.locationName).toBe('Joshua Dubz New Stadium')
        expect(res.body.data.location.type).toBe('Point')
        expect(res.body.data.location.coordinates).toStrictEqual([22.33, 44.555])
        expect(res.body.data.dateStart).toBe('2021-08-12T12:23:34.944Z')
        expect(res.body.data.dateFinish).toBe('2090-08-13T12:23:34.944Z')
    })
})
