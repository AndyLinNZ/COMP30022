const setupTestEnv = require('./test-utils')
const League = require('../../models/league')
const Season = require('../../models/season')
const Grade = require('../../models/grade')
const Team = require('../../models/team')
const Round = require('../../models/round')
const Game = require('../../models/game')
const Player = require('../../models/player')
const PlayerStat = require('../../models/playerStat')
const supertest = require('supertest')
const initApp = require('../../app')
const app = initApp()
const request = supertest(app)

const env = {}
const setupOptions = { createDefaultUsers: true }
setupTestEnv('dribblrDB-grade-test', env, setupOptions)

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
    location: [-22.22, 33.33],
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

    env.game0_id = game._id.toString()
    env.team1_id = team1._id.toString()
    env.team2_id = team2._id.toString()

})

describe('Integration Testing: finding games', () => {
    test('Should be able to find an existent game', async () => {
        const res = await request.get(`/api/game/${env.game0_id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.dateStart).toBe(testGame.dateStart)
        expect(res.body.data.dateFinish).toBe(testGame.dateFinish)
        expect(res.body.data.round).toBe(env.game0_id_id)
        expect(res.body.data.locationName).toBe('Josh Dubz Stadium')
        // how to check location coordinates?
        expect(res.body.data.location).toStrictEqual([-22.22, 33.33])
        expect(res.body.data.team1.team).toBe(env.team1_id)
        expect(res.body.data.team2.team).toBe(env.team2_id)
    })

    test('Finding a league with a nonexistent id should return an error', async () => {
        const res = await request.get(`/api/game/${env.auth_tokens[0][0]}`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Game does not exist')
    })

    test('Finding a league with an invalid MongoDB object id should return an error', async () => {
        const res = await request.get('/api/league/1337')

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Game does not exist')
    })
})