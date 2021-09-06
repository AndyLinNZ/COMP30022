const setupTestEnv = require('./test-utils')
const Team = require('../../models/team')
const Player = require('../../models/player')
const supertest = require('supertest')
const initApp = require('../../app')
const app = initApp()
const request = supertest(app)

const env = {}
const setupOptions = { createDefaultUsers: true }
setupTestEnv('dribblrDB-grade-test', env, setupOptions)

// set up test team
const testTeam = {
    name: 'jdubz'
}
const testPlayer = {
    name: 'joshua dubar is a player'
}
beforeAll(async () => {
    // add new test league object to database
    const newTeam = new Team({
        ...testTeam,
        admin: env.auth_tokens[0][0],
        grades: [],
        players: []
    })
    const team = await newTeam.save()

    const newPlayer = new Player(testPlayer)
    const player = await newPlayer.save()

    env.team0_id = team._id.toString()
    env.player0_id = player._id.toString()
})

describe('Integration Testing: creating teams', () => {
    test('User should be able to create team', async () => {
        const res = await request.post(`/api/team`)
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
        expect(res.body.data.admin).toStrictEqual(env.auth_tokens[0][0])
        expect(res.body.data.players).toStrictEqual([])
        expect(res.body.data.gameResults).toStrictEqual([])
        expect(res.body.data.grades).toStrictEqual([])
        expect(res.body.data.name).toBe(testTeam.name)
        expect(res.body.data.totalPoints).toBe(0)
        expect(res.body.data.totalWins).toBe(0)
        expect(res.body.data.totalLosses).toBe(0)
        expect(res.body.data.totalDraws).toBe(0)
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

describe('Integration Testing: adding players to a team', () => {
    test('User should not be able to add team players if they are not the team admin', async () => {
        const res = await request.post(`/api/team/${env.team0_id}/player`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                playerIds: [env.player0_id]
            })

        expect(res.statusCode).toBe(403)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('User is not a team admin')
    })


    test('Adding users as team admin to an invalid team should return an error', async () => {
        const res = await request.post(`/api/team/1337/player`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                playerIds: [env.player0_id]
            })
            
        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Team does not exist')
        
    })

    test('Adding nonexistent players into team should return an error', async () => {
        const res = await request.post(`/api/team/${env.team0_id}/player`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                playerIds: ['1337']
            })

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Some players do not exist')
    })

    test('Team admin should be able to add a player to a team', async () => {
        const res = await request.post(`/api/team/${env.team0_id}/player`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                playerIds: [env.player0_id]
            })

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data).toStrictEqual([env.player0_id])
    })
})

describe('Integration Testing: Deleting players from a team', () => {
    test('Users other than the team admin should not be able to remove players', async () => {
        const res = await request.delete(`/api/team/${env.team0_id}/player`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                playerIds: [env.player0_id]
            })

        expect(res.statusCode).toBe(403)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('User is not a team admin')
    })

    test('Removing players as team admin from an invalid team should return an error', async () => {
        const res = await request.delete('/api/team/1337/player')
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                playerIds: [env.player0_id]
            })

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Team does not exist')
    })

    test('Removing player with invalid player ids should return an error', async () => {
        const res = await request.delete(`/api/team/${env.team0_id}/player`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                playerIds: ['1337']
            })

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Some players do not exist')
    })

    test('Team admin should be able to delete a player from a team', async () => {
        const res = await request.delete(`/api/team/${env.team0_id}/player`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                playerIds: [env.player0_id]
            })

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data).toStrictEqual([])
    })
})