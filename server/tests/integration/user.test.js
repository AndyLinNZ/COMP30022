const setupTestEnv = require('./test-utils')
const supertest = require('supertest')
const initApp = require('../../app')
const app = initApp()
const request = supertest(app)

const env = {}
const setupOptions = { createDefaultUsers: true }
setupTestEnv('dribblrDB-user-test', env, setupOptions)

describe('Integration Testing: getting user details', () => {
    test('Should be able to get user details for logged in user #1', async () => {
        const res = await request.get(`/api/user/details`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.email).toBe(env.usersDetails[0][0].email)
        expect(res.body.data.firstName).toBe(env.usersDetails[0][0].firstName)
        expect(res.body.data.lastName).toBe(env.usersDetails[0][0].lastName)
        expect(res.body.data.leagues).toStrictEqual([])
    })

    test('Should be able to get user details for logged in user #2', async () => {
        const res = await request.get(`/api/user/details`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.email).toBe(env.usersDetails[1][0].email)
        expect(res.body.data.firstName).toBe(env.usersDetails[1][0].firstName)
        expect(res.body.data.lastName).toBe(env.usersDetails[1][0].lastName)
        expect(res.body.data.leagues).toStrictEqual([])
    })

    test('Getting user details with invalid JWT should return an error', async () => {
        const res = await request.get(`/api/user/details`)
            .set('Authorization', `Bearer asdf`)

        expect(res.statusCode).toBe(401)
        expect(res.text).toBe('Unauthorized')
    })

    test('Getting user details with no auth header should return an error', async () => {
        const res = await request.get(`/api/user/details`)

        expect(res.statusCode).toBe(401)
        expect(res.text).toBe('Unauthorized')
    })
})
