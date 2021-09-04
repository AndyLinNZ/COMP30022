const setupTestEnv = require('./test-utils')
const supertest = require('supertest')
const initApp = require('../../app')
const app = initApp()
const request = supertest(app)

const env = {}
const setupOptions = { createDefaultUsers: true }
setupTestEnv('dribblrDB-grade-test', env, setupOptions)

describe('Integration Testing: creating teams', () => {
    test('User should be able to create team', async () => {
        const res = await request
            .post(`/api/team`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                teamName: 'jdubz team',
            })

        expect(res.statusCode).toBe(201)
        expect(res.body.success).toBe(true)
        expect(res.body.data.admin).toStrictEqual(env.auth_tokens[0][0])
        expect(res.body.data.grades).toStrictEqual([])
        expect(res.body.data.name).toBe('jdubz team')
    })
})
