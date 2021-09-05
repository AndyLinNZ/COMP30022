const setupTestEnv = require('./test-utils')
const supertest = require('supertest')
const initApp = require('../../app')
const app = initApp()
const request = supertest(app)

const env = {}
const setupOptions = { createDefaultUsers: true }
setupTestEnv('dribblrDB-grade-test', env, setupOptions)

// set up test team
const testTeam = {
    teamName: 'jdubz',
}
beforeAll(async () => {
    // add new test league object to database
    const newTeam = new Team({
        ...testTeam,
        admin: env.auth_tokens[0][0],
        grades: [],
        players: [],
    })
    const team = await newTeam.save()

    env.team0_id = team._id.toString()
})

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

describe('Integration Testing: finding teams', () => {
    test('Should be able to find an existent team', async () => {
        const res = await request.get(`/api/team/${env.team0_id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.admin).toStrictEqual([env.auth_tokens[0][0]])
        expect(res.body.data.players).toStrictEqual([])
        expect(res.body.data.gameResults).toStrictEqual([])
        expect(res.body.data.grades).toStrictEqual([])
        expect(res.body.data.name).toBe(testTeam.name)
        expect(res.body.data[0].totalPoints).toBe(0)
        expect(res.body.data[0].totalWins).toBe(0)
        expect(res.body.data[0].totalLosses).toBe(0)
        expect(res.body.data[0].totalDraws).toBe(0)
    })

    test('Finding a team with a nonexistent id should return an error', async () => {
        const res = await request.get(`/api/team/${env.auth_tokens[0][0]}`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Team does not exist')
    })

    test('Finding a team with an invalid MongoDB object id should return an error', async () => {
        const res = await request.get('/api/team/1337')

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Team does not exist')
    })
})
