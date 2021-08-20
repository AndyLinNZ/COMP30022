const setupTestEnv = require('./test-env')
const supertest = require('supertest')
const initApp = require('../../app')
const app = initApp()
const request = supertest(app)

setupTestEnv('dribblrDR-auth-test')

test('Registration with invalid email should fail', async () => {
    const res = await request.post('/api/auth/register')
        .send({
            email: 'invalid!email.com',
            password: 'secure password 999',
            firstName: 'John',
            lastName: 'Smith'
        })

    expect(res.statusCode).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.error).toBe('Invalid email')
})

test('Registration with weak password should fail', async () => {
    const res = await request.post('/api/auth/register')
        .send({
            email: 'good@email.com',
            password: 'qwerty',
            firstName: 'John',
            lastName: 'Smith'
        })

    expect(res.statusCode).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.error).toBe('Password is too weak')
})

test('Registration with missing email should fail', async () => {
    const res = await request.post('/api/auth/register')
        .send({
            password: 'secure password 999',
            firstName: 'John',
            lastName: 'Smith'
        })

    expect(res.statusCode).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.error).toBe('Missing "email" field')
})

test('Registration with missing password should fail', async () => {
    const res = await request.post('/api/auth/register')
        .send({
            email: 'good@email.com',
            firstName: 'John',
            lastName: 'Smith'
        })

    expect(res.statusCode).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.error).toBe('Missing "password" field')
})

test('Registration with missing first name should fail', async () => {
    const res = await request.post('/api/auth/register')
        .send({
            email: 'good@email.com',
            password: 'secure password 999',
            lastName: 'Smith'
        })

    expect(res.statusCode).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.error).toBe('Missing "firstName" field')
})

test('Registration with missing last name should fail', async () => {
    const res = await request.post('/api/auth/register')
        .send({
            email: 'good@email.com',
            password: 'secure password 999',
            firstName: 'John'
        })

    expect(res.statusCode).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.error).toBe('Missing "lastName" field')
})

test('Registration with valid request data should succeed', async () => {
    const res = await request.post('/api/auth/register')
        .send({
            email: 'testuser123@test.com',
            password: 'secure password 999',
            firstName: 'John',
            lastName: 'Smith'
        })

    expect(res.statusCode).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe('Registration successful')
})

test('Registration with existing email should fail', async () => {
    const res = await request.post('/api/auth/register')
        .send({
            email: 'testuser123@test.com',
            password: 'secure password 999',
            firstName: 'John',
            lastName: 'Smith'
        })

    expect(res.statusCode).toBe(409)
    expect(res.body.success).toBe(false)
    expect(res.body.error).toBe('A user has already registered with that email')
})

test('Login with invalid credentials should fail', async () => {
    const res = await request.post('/api/auth/login')
        .send({
            username: 'testuser123@test.com',
            password: 'incorrect password 666',
        })

    expect(res.statusCode).toBe(401)
    expect(res.body.success).toBe(false)
    expect(res.body.error).toBe('Password or username is incorrect')
})

test('Login with valid credentials should succeed', async () => {
    const res = await request.post('/api/auth/login')
        .send({
            username: 'testuser123@test.com',
            password: 'secure password 999',
        })

    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.token).toBeTruthy()
})
