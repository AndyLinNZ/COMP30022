const setupTestEnv = require('./test-utils')
const supertest = require('supertest')
const initApp = require('../../app')
const User = require('../../models/user')
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
        expect(res.body.data.teams).toStrictEqual([])
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
        expect(res.body.data.teams).toStrictEqual([])
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

describe('Integration Testing: updating user details', () => {
    test('Updating user details with invalid JWT should return an error', async () => {
        const res = await request.patch(`/api/user/details`)
            .set('Authorization', `Bearer asdf`)

        expect(res.statusCode).toBe(401)
        expect(res.text).toBe('Unauthorized')
    })

    test('Updating user details with invalid email should return an error', async () => {
        const res = await request.patch(`/api/user/details`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({ email: 'malformed email' })

        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Invalid email')
    })

    test('Updating user details with weak password should return an error', async () => {
        const res = await request.patch(`/api/user/details`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({ password: 'weakpw' })

        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Password is too weak')
    })

    test('Updating user details with conflicting email should return an error', async () => {
        const res = await request.patch(`/api/user/details`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({ email: env.usersDetails[1][0].email })

        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Email in use by another user')
    })

    test('Updating user details firstName and lastName should properly update', async () => {
        const res = await request.patch(`/api/user/details`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({ firstName: 'john', lastName: 'Doe' })

        expect(res.statusCode).toBe(200)
        expect(res.body.data._id).toBe(env.auth_tokens[0][0])
        expect(res.body.data.firstName).toBe('john')
        expect(res.body.data.lastName).toBe('Doe')
    })

    test('Updating user details email should properly update', async () => {
        const res = await request.patch(`/api/user/details`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({ email: 'jane.doe123@example.com' })

        expect(res.statusCode).toBe(200)
        expect(res.body.data._id).toBe(env.auth_tokens[1][0])
        expect(res.body.data.firstName).toBe(env.usersDetails[1][0].firstName)
        expect(res.body.data.lastName).toBe(env.usersDetails[1][0].lastName)
    })

    test('Updating user details password should properly update', async () => {
        const res = await request.patch(`/api/user/details`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({ password: 'johns new secur3 password!' })

        expect(res.statusCode).toBe(200)
        expect(res.body.data._id).toBe(env.auth_tokens[0][0])

        // try to auth with old password
        const user = await User.findById(env.auth_tokens[0][0])
        const authed = await user.authenticate(env.usersDetails[0][1])
        expect(authed.user).toBe(false)
        expect(authed.error.message).toBe('Password or username is incorrect')

        const authed1 = await user.authenticate('johns new secur3 password!')
        expect(authed1.user._id.toString()).toBe(env.auth_tokens[0][0])
    })
})
