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
setupTestEnv('dribblrDB-season-test', env, setupOptions)

// set up test league
const testLeague = {
    leagueName: 'Joshua Basketball Association',
    organisationName: 'JoshuaDubar',
}
const testSeason = {
    name: 'Summer 2020/2021',
    seasonStart: '2021-08-12T12:23:34.944Z',
    seasonFinish: '2021-08-24T12:23:34.944Z',
}
const testGrade = {
    name: 'Joshua Dubar Grade',
    difficulty: 'E',
    gender: 'female',
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
        seasons: [],
    })
    const league = await newLeague.save()

    // add a new season object to database
    const newSeason = new Season({
        name: testSeason.name,
        dateStart: testSeason.seasonStart,
        dateFinish: testSeason.seasonFinish,
        league: league._id,
        grades: [],
    })
    const season = await newSeason.save()

    // add the new season as a season to the league
    league.seasons.push(season._id)
    await league.save()

    // add a new grade object to database
    const newGrade = new Grade({
        ...testGrade,
        teams: [],
        season: season._id,
    })
    const grade = await newGrade.save()

    // add the new grade as a grade to the season
    season.grades.push(grade._id)
    await season.save()

    // add a new team object to database
    const newTeam = new Team({
        ...testTeam,
        admin: env.auth_tokens[0][0],
        grades: [grade._id],
    })
    const team = await newTeam.save()

    // add the new team as a team to the grade
    grade.teams.push(team._id)
    await grade.save()

    env.league0_id = league._id.toString()
    env.season0_id = season._id.toString()
    env.grade0_id = grade._id.toString()
    env.team0_id = team._id.toString()
})

describe('Integration Testing: finding grades', () => {
    test('Should be able to find an existent grade', async () => {
        const res = await request.get(`/api/grade/${env.grade0_id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.difficulty).toBe(testGrade.difficulty)
        expect(res.body.data.gender).toBe(testGrade.gender)
        expect(res.body.data.name).toBe(testGrade.name)
        expect(res.body.data.season).toBe(env.season0_id)
    })

    test('Finding a grade with a nonexistent id should return an error', async () => {
        const res = await request.get(`/api/grade/aaaabbbbcccc`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Grade does not exist')
    })

    test('Finding a grade with an invalid MongoDB object id should return an error', async () => {
        const res = await request.get(`/api/grade/1337`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Grade does not exist')
    })
})

describe('Integration Testing: finding teams in grades', () => {
    test('Finding teams for a grade with a nonexistent id should return an error', async () => {
        const res = await request.get('/api/grade/badgradeid/team')

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Grade does not exist')
    })

    test('Should be able to find teams for an existent grade', async () => {
        const res = await request.get(`/api/grade/${env.grade0_id}/team`)

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data[0].name).toBe(testTeam.name)
        expect(res.body.data[0].totalPoints).toBe(0)
        expect(res.body.data[0].totalWins).toBe(0)
        expect(res.body.data[0].totalLosses).toBe(0)
        expect(res.body.data[0].totalDraws).toBe(0)
        expect(res.body.data[0].gameResults).toStrictEqual([])
        expect(res.body.data[0].admin).toBe(env.auth_tokens[0][0])
        expect(res.body.data[0].grades).toStrictEqual([env.grade0_id])
    })
})
