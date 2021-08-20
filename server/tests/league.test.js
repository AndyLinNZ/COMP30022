const setupTestEnv = require('./test-env')
const supertest = require('supertest')
const initApp = require('../app')
const app = initApp()
const request = supertest(app)

const env = {}
const setupOptions = { createDefaultUsers: true }
setupTestEnv('dribblrDR-league-test', env, setupOptions)

test('Logged in user should be able to create a league', async () => {
    const res = await request.post('/api/league')
        .set('Authorization', `Bearer ${env.auth_tokens[0]}`)
        .send({
            leagueName: 'Joshua Basketball Association',
            organisationName: 'JoshuaDubar',
        })

    expect(res.statusCode).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toBeTruthy()

    env.league0_id = res.body.data._id
})

test('Not logged in user should not be able to create a league', async () => {
    const res = await request.post('/api/league')
        .send({
            leagueName: 'unauthorized basketball association',
            organisation: 'notLoggedIn',
        })

    expect(res.statusCode).toBe(401)
})

test('Should not be able to create season for an invalid league', async () => {
    const res = await request.post(`/api/league/fakeleagueid/season`)
        .set('Authorization', `Bearer ${env.auth_tokens[0]}`)
        .send({
            seasonName: 'test season name',
            seasonStart: '2021-08-12T12:23:34.944Z',
            seasonFinish: '2021-08-19T12:23:34.944Z',
        })

    expect(res.statusCode).toBe(404)
    expect(res.body.success).toBe(false)
    expect(res.body.error).toBe('League does not exist')
})

test('User should not be able to create season if they are not admin', async () => {
    const res = await request.post(`/api/league/${env.league0_id}/season`)
        .set('Authorization', `Bearer ${env.auth_tokens[1]}`)
        .send({
            seasonName: 'test season name',
            seasonStart: '2021-08-12T12:23:34.944Z',
            seasonFinish: '2021-08-19T12:23:34.944Z',
        })

    expect(res.statusCode).toBe(403)
    expect(res.body.success).toBe(false)
    expect(res.body.error).toBe('User is not an admin')
})
