const setupTestEnv = require('./test-utils')
const League = require('../../models/league')
const Season = require('../../models/season')
const supertest = require('supertest')
const initApp = require('../../app')
const app = initApp()
const request = supertest(app)

const env = {}
const setupOptions = { createDefaultUsers: true }
setupTestEnv('dribblrDB-season-test', env, setupOptions)

// set up test league
const testLeague = {
    leagueName: 'Joshua Basketball Association',
    organisationName: 'JoshuaDubar'
}
const testSeason = {
    name: 'Summer 2020/2021',
    seasonStart: '2021-08-12T12:23:34.944Z',
    seasonFinish: '2021-08-24T12:23:34.944Z'
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

    env.league0_id = league._id.toString()
    env.season0_id = season._id.toString()
})

describe('Integration Testing: finding seasons', () => {
    test('Shoudl be able to find an existent season', async () => {
        const res = await request.get(`/api/season/${env.season0_id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.status).toBe('upcoming')
        expect(res.body.data.grades).toStrictEqual([])
        expect(res.body.data.name).toBe(testSeason.name)
        expect(res.body.data.dateStart).toBe(testSeason.seasonStart)
        expect(res.body.data.dateFinish).toBe(testSeason.seasonFinish)
        expect(res.body.data.league).toBe(env.league0_id)
    })

    test('Finding a season with a nonexistent id should return an error', async () => {
        const res = await request.get(`/api/season/aaaabbbbcccc`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Season does not exist')
    })

    test('Finding a season with an invalid MongoDB object id should return an error', async () => {
        const res = await request.get(`/api/season/1337`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Season does not exist')
    })
})

describe('Integration Testing: creating grades', () => {
    test('Should not be able to create grade for an invalid season', async () => {
        const res = await request.post('/api/season/badseasonid/grade')
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                gradeName: 'Joshua Dubar Grade',
                gradeGender: 'female',
                gradeDifficulty: 'E'
            })

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Season does not exist')
    })

    test('User should not be able to create grade if they are not league admin', async () => {
        const res = await request.post(`/api/season/${env.season0_id}/grade`)
            .set('Authorization', `Bearer ${env.auth_tokens[2][1]}`)
            .send({
                gradeName: 'Joshua Dubar Grade',
                gradeGender: 'female',
                gradeDifficulty: 'E'
            })

        expect(res.statusCode).toBe(403)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('User is not an admin')
    })

    test('League admin should be able to create grade', async () => {
        const res = await request.post(`/api/season/${env.season0_id}/grade`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                gradeName: 'Joshua Dubar Grade',
                gradeGender: 'female',
                gradeDifficulty: 'E'
            })

        expect(res.statusCode).toBe(201)
        expect(res.body.success).toBe(true)
        expect(res.body.data.difficulty).toBe('E')
        expect(res.body.data.gender).toBe('female')
        expect(res.body.data.teams).toStrictEqual([])
        expect(res.body.data.name).toBe('Joshua Dubar Grade')
        expect(res.body.data.season).toBe(env.season0_id)
    })
})

describe('Integration Testing: finding grades for a season', () => {
    test('Should be able to find grades for an existent season', async () => {
        const res = await request.get(`/api/season/${env.season0_id}/grade`)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data[0].difficulty).toBe('E')
        expect(res.body.data[0].gender).toBe('female')
        expect(res.body.data[0].teams).toStrictEqual([])
        expect(res.body.data[0].name).toBe('Joshua Dubar Grade')
        expect(res.body.data[0].season).toBe(env.season0_id)
    })

    test('Finding grades for a nonexisten season should return an error', async () => {
        const res = await request.get(`/api/season/1337/grade`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Season does not exist')
    })
})
