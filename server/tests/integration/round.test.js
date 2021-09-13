const setupTestEnv = require('./test-utils')
const League = require('../../models/league')
const Season = require('../../models/season')
const Grade = require('../../models/grade')
const Round = require('../../models/round')
const Team = require('../../models/team')
const supertest = require('supertest')
const initApp = require('../../app')
const app = initApp()
const request = supertest(app)

const env = {}
const setupOptions = { createDefaultUsers: true }
setupTestEnv('dribblrDB-round-test', env, setupOptions)

// set up test league
const testLeague = {
    leagueName: 'Joshua Basketball Association',
    organisationName: 'JoshuaDubar',
}
const testSeason = {
    name: 'Summer 2020/2021',
    seasonStart: '2021-08-12T12:23:34.944Z',
    seasonFinish: '2021-08-24T12:23:34.944Z',
}
const testGrade = {
    name: 'Joshua Dubar Grade',
    difficulty: 'E',
    gender: 'female',
}
const testRound = {
    date: '2021-08-11T00:00:00.000Z',
}
const testTeam1 = {
    name: 'jdubz1'
}

const testTeam2 = {
    name: 'josh2'
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


    // add the new grade as a grade to the season
    season.grades.push(grade._id)
    await season.save()

    // add a new round object to database
    const newRound = new Round({
        ...testRound,
        grade: grade._id,
    })
    const round = await newRound.save()

    // add round to grade's fixture
    grade.fixture.push(round._id)
    await grade.save()

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

    // add the new teams as teams in the grade
    grade.teams.push(team1._id)
    grade.teams.push(team2._id)
    await grade.save()

    const testGame = {
        start: '2021-08-12T10:00:00.000Z',
        finish: '2021-08-12T11:00:00.000Z',
        venue_name: 'Josh Dubz Stadium',
        game_location: { type: 'Point', coordinates: [-22.22, 33.33] },
        team1_id: team1._id,
        team2_id: team2._id,
    }

    env.league0_id = league._id.toString()
    env.season0_id = season._id.toString()
    env.grade0_id = grade._id.toString()
    env.round0_id = round._id.toString()
    env.team1_id = team1._id.toString()
    env.team2_id = team2._id.toString()
    env.test_game_details = testGame
})

describe('Integration Testing: finding rounds', () => {
    test('Should be able to find an existent round', async () => {
        const res = await request.get(`/api/round/${env.round0_id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data._id).toBe(env.round0_id)
        expect(res.body.data.games).toStrictEqual([])
        expect(res.body.data.date).toBe(testRound.date)
        expect(res.body.data.grade).toBe(env.grade0_id)
    })

    test('Finding a round with a nonexistent id should return an error', async () => {
        const res = await request.get(`/api/round/aaaabbbbcccc`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Round does not exist')
    })

    test('Finding a grade with an invalid MongoDB object id should return an error', async () => {
        const res = await request.get(`/api/round/1337`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Round does not exist')
    })
})

describe('Integration Testing: creating games', () => {
    test('Should not be able to create game for an invalid round', async () => {
        const res = await request.post('/api/round/badroundid/game')
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send(env.test_game_details)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Round does not exist')
    })

    test('User should not be able to create game if they are not league admin', async () => {
        const res = await request.post(`/api/round/${env.round0_id}/game`)
            .set('Authorization', `Bearer ${env.auth_tokens[2][1]}`)
            .send(env.test_game_details)

        expect(res.statusCode).toBe(403)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('User is not an admin')
    })

    test('League admin should be able to create game', async () => {
        const res = await request.post(`/api/round/${env.round0_id}/game`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send(env.test_game_details)

        expect(res.statusCode).toBe(201)
        expect(res.body.success).toBe(true)
        expect(res.body.data.team1.playersStats).toStrictEqual([])
        expect(res.body.data.team1.team).toBe(env.team1_id)
        expect(res.body.data.team2.playersStats).toStrictEqual([])
        expect(res.body.data.team2.team).toBe(env.team2_id)
        expect(res.body.data.dateStart).toBe(env.test_game_details.start)
        expect(res.body.data.dateFinish).toBe(env.test_game_details.finish)
        expect(res.body.data.round._id).toBe(env.round0_id)
        expect(res.body.data.locationName).toBe(env.test_game_details.venue_name)
        expect(res.body.data.location).toStrictEqual(env.test_game_details.game_location)
    })

})
