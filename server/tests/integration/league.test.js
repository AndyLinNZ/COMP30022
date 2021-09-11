const setupTestEnv = require('./test-utils')
const supertest = require('supertest')
const initApp = require('../../app')
const app = initApp()
const request = supertest(app)

const env = {}
const setupOptions = { createDefaultUsers: true }
setupTestEnv('dribblrDB-league-test', env, setupOptions)

describe('Integration Testing: creating leagues', () => {
    test('Logged in user should be able to create a league', async () => {
        const res = await request.post('/api/league')
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                leagueName: 'Joshua Basketball Association',
                organisationName: 'JoshuaDubar',
            })

        expect(res.statusCode).toBe(201)
        expect(res.body.success).toBe(true)
        expect(res.body.data.admins).toStrictEqual([env.auth_tokens[0][0]])
        expect(res.body.data.seasons).toStrictEqual([])
        expect(res.body.data.name).toBe('Joshua Basketball Association')
        expect(res.body.data.organisation).toBe('JoshuaDubar')
        expect(res.body.data.creator).toBe(env.auth_tokens[0][0])

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
})

describe('Integration Testing: finding leagues', () => {
    test('Should be able to find an existent league', async () => {
        const res = await request.get(`/api/league/${env.league0_id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.admins).toStrictEqual([env.auth_tokens[0][0]])
        expect(res.body.data.seasons).toStrictEqual([])
        expect(res.body.data.name).toBe('Joshua Basketball Association')
        expect(res.body.data.organisation).toBe('JoshuaDubar')
        expect(res.body.data.creator).toBe(env.auth_tokens[0][0])
    })

    test('Finding a league with a nonexistent id should return an error', async () => {
        const res = await request.get(`/api/league/${env.auth_tokens[0][0]}`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('League does not exist')
    })

    test('Finding a league with an invalid MongoDB object id should return an error', async () => {
        const res = await request.get('/api/league/1337')

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('League does not exist')
    })
})

describe('Integration Testing: creating seasons', () => {
    test('Should not be able to create season for an invalid league', async () => {
        const res = await request.post('/api/league/fakeleagueid/season')
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
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
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                seasonName: 'test season name',
                seasonStart: '2021-08-12T12:23:34.944Z',
                seasonFinish: '2021-08-19T12:23:34.944Z',
            })

        expect(res.statusCode).toBe(403)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('User is not an admin')
    })

    test('League admin should be able to create season', async () => {
        const res = await request.post(`/api/league/${env.league0_id}/season`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                seasonName: 'test season name',
                seasonStart: '2021-08-12T12:23:34.944Z',
                seasonFinish: '2021-08-19T12:23:34.944Z',
            })

        expect(res.statusCode).toBe(201)
        expect(res.body.success).toBe(true)
        expect(res.body.data.status).toBe('completed')
        expect(res.body.data.grades).toStrictEqual([])
        expect(res.body.data.name).toBe('test season name')
        expect(res.body.data.dateStart).toBe('2021-08-12T12:23:34.944Z')
        expect(res.body.data.dateFinish).toBe('2021-08-19T12:23:34.944Z')
    })
})

describe('Integration Testing: finding seasons for a league', () => {
    test('Should be able to find seasons for an existent league', async () => {
        const res = await request.get(`/api/league/${env.league0_id}/season`)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.length).toBe(1)
        expect(res.body.data[0].status).toBe('completed')
        expect(res.body.data[0].grades).toStrictEqual([])
        expect(res.body.data[0].name).toBe('test season name')
        expect(res.body.data[0].dateStart).toBe('2021-08-12T12:23:34.944Z')
        expect(res.body.data[0].dateFinish).toBe('2021-08-19T12:23:34.944Z')
    })

    test('Finding seasons for a nonexistent league should return an error', async () => {
        const res = await request.get('/api/league/1337/season')

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('League does not exist')
    })
})

describe('Integration Testing: adding/remove admins from league', () => {
    test('User should not be able to add league admins if they are not creator', async () => {
        const res = await request.post(`/api/league/${env.league0_id}/admin`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                adminIds: [env.auth_tokens[1][1]]
            })

        expect(res.statusCode).toBe(403)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('User is not a creator')
    })


    test('Adding users as league admin to an invalid league should return an error', async () => {
        const res = await request.post('/api/league/1337/admin')
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                adminIds: [env.auth_tokens[1][0]]
            })
            
        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('League does not exist')
        
    })

    test('Adding nonexistent users as league admin should return an error', async () => {
        const res = await request.post(`/api/league/${env.league0_id}/admin`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                adminIds: ['1337']
            })

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Some users do not exist')
    })

    test('League creator should be able to add another admin to a league', async () => {
        const res = await request.post(`/api/league/${env.league0_id}/admin`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                adminIds: [env.auth_tokens[1][0]]
            })

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data).toStrictEqual([env.auth_tokens[0][0], env.auth_tokens[1][0]])
    })

    test('Users other than the league creator should not be able to remove league admins', async () => {
        const res = await request.delete(`/api/league/${env.league0_id}/admin`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                adminIds: [env.auth_tokens[0][0]]
            })

        expect(res.statusCode).toBe(403)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('User is not a creator')
    })

    test('Removing users as league admin to an invalid league should return an error', async () => {
        const res = await request.delete('/api/league/1337/admin')
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                adminIds: [env.auth_tokens[0][0]]
            })

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('League does not exist')
    })

    test('Removing use with invalid user ids should return an error', async () => {
        const res = await request.delete(`/api/league/${env.league0_id}/admin`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                adminIds: ['1337', null]
            })

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Some users do not exist')
    })
})
