const setupTestEnv = require('./test-utils')
const League = require('../../models/league')
const Season = require('../../models/season')
const Grade = require('../../models/grade')
const Team = require('../../models/team')
const supertest = require('supertest')
const initApp = require('../../app')
const app = initApp()
const request = supertest(app)

const env = {}
const setupOptions = { createDefaultUsers: true }
setupTestEnv('dribblrDB-grade-test', env, setupOptions)

const testLeague = {
    leagueName: 'Joshua Basketball Association',
    organisationName: 'JoshuaDubar'
}
const testSeason = {
    name: 'Summer 2020/2021',
    seasonStart: '2021-08-12T12:23:34.944Z',
    seasonFinish: '2021-08-24T12:23:34.944Z'
}
const testGrade = {
    name: 'Joshua Dubar Grade',
    difficulty: 'E',
    gender: 'female'
}
const testTeam = {
    name: 'jdubz',
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
    season.grades.push(grade._id)
    await season.save()

    // add new test team object to database
    const newTeam = new Team({
        ...testTeam,
        admin: env.auth_tokens[0][0],
        grades: [grade._id],
        players: [],
    })
    const team = await newTeam.save()
    grade.teams.push(team._id)
    await grade.save()

    // add new test team object to database to be deleted
    const secondTeam = new Team({
        name: 'Joshua Dubar Team',
        admin: env.auth_tokens[0][0],
        grades: [],
        players: [],
    })
    const team2 = await secondTeam.save()

    env.grade0_id = grade._id.toString()
    env.team0_id = team._id.toString()
    env.team1_id = team2._id.toString()
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
        expect(res.body.data.admin).toStrictEqual(env.auth_tokens[0][0])
        expect(res.body.data.players).toStrictEqual([])
        expect(res.body.data.games).toStrictEqual([])
        expect(res.body.data.grades).toStrictEqual([env.grade0_id])
        expect(res.body.data.name).toBe(testTeam.name)
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

describe('Integration Testing: finding all teams', () => {
    test('Should be able to find all existing teams', async () => {
        const res = await request.get(`/api/team`)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.length).toBe(3)
    })

    test('Should be able to find all teams that are not in a specific grade', async () => {
        const res = await request.get(`/api/team?grade=${env.grade0_id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.length).toBe(2)
    })
})

describe('Integration Testing: adding players to a team', () => {
    test('User should not be able to add team players if they are not the team admin', async () => {
        const res = await request
            .post(`/api/team/${env.team0_id}/player`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                playerNames: [{ playerName: 'nooo' }],
            })

        expect(res.statusCode).toBe(403)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('User is not a team admin')
    })

    test('Adding users as team admin to an invalid team should return an error', async () => {
        const res = await request
            .post(`/api/team/1337/player`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                playerNames: [{ playerName: 'joshua' }],
            })

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Team does not exist')
    })

    test('Team admin should be able to add a player to a team', async () => {
        const res = await request
            .post(`/api/team/${env.team0_id}/player`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                playerNames: [{ playerName: 'joshua' }],
            })

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.length).toBe(1)

        env.player0_id = res.body.data[0]
    })
})

describe('Integration Testing: Deleting players from a team', () => {
    test('Users other than the team admin should not be able to remove players', async () => {
        const res = await request
            .delete(`/api/team/${env.team0_id}/player`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                playerIds: [env.player0_id],
            })

        expect(res.statusCode).toBe(403)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('User is not a team admin')
    })

    test('Removing players as team admin from an invalid team should return an error', async () => {
        const res = await request
            .delete('/api/team/1337/player')
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                playerIds: [env.player0_id],
            })

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Team does not exist')
    })

    test('Removing player with invalid player ids should return an error', async () => {
        const res = await request
            .delete(`/api/team/${env.team0_id}/player`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                playerIds: ['1337'],
            })

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Some players do not exist')
    })

    test('Team admin should be able to delete a player from a team', async () => {
        const res = await request
            .delete(`/api/team/${env.team0_id}/player`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                playerIds: [env.player0_id],
            })

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data).toStrictEqual([])
    })
})

describe('Integration Testing: updating a team', () => {
    test('Updating a team with a nonexistent id should return an error', async () => {
        const res = await request
            .patch(`/api/team/aaaabbbbcccc`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Team does not exist')
    })

    test('A user should not be able to update a team if they are not the team admin', async () => {
        const res = await request
            .patch(`/api/team/${env.team0_id}`)
            .set('Authorization', `Bearer ${env.auth_tokens[2][1]}`)

        expect(res.statusCode).toBe(403)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('User is not a team admin')
    })

    test('Should be able to update a team with valid id for just teamName', async () => {
        const res = await request
            .patch(`/api/team/${env.team1_id}`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                teamName: 'Joshua Dubar Average Team',
            })

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.admin).toStrictEqual(env.auth_tokens[0][0])
        expect(res.body.data.players).toStrictEqual([])
        expect(res.body.data.games).toStrictEqual([])
        expect(res.body.data.grades).toStrictEqual([])
        expect(res.body.data.name).toBe('Joshua Dubar Average Team')
    })
})
