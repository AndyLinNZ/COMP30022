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
    organisationName: 'JoshuaDubar'
}
const testSeason = {
    name: 'Summer 2020/2021',
    seasonStart: '2021-09-09T12:23:34.944Z',
    seasonFinish: '2021-10-24T12:23:34.944Z'
}
const testGrade = {
    name: 'Joshua Dubar Grade',
    difficulty: 'E',
    gender: 'female'
}
const testTeam = {
    name: 'jdubz'
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

    // add second season object to database
    const secondSeason = new Season({
        name: 'Another Josh Dubar Season',
        dateStart: testSeason.seasonStart,
        dateFinish: testSeason.seasonFinish,
        league: league._id,
        grades: []
    })
    const season1 = await secondSeason.save()

    // add the new season as a season to the league
    league.seasons.push(season._id)
    league.seasons.push(season1._id)
    await league.save()

    // add a new grade object to database
    const newGrade = new Grade({
        ...testGrade,
        teams: [],
        season: season._id
    })
    const grade = await newGrade.save()

    // add a test grade object to database but with no teams
    const secondGrade = new Grade({
        ...testGrade,
        name: 'Joshua Dubar Grade 2',
        teams: [],
        season: season._id
    })
    const grade1 = await secondGrade.save()

    // add a test grade object to database to be deleted
    const thirdGrade = new Grade({
        ...testGrade,
        name: 'Joshua Dubar Grade 3',
        teams: [],
        season: season._id
    })
    const grade2 = await thirdGrade.save()

    // add a test grade object to database for fixtures
    const fourthGrade = new Grade({
        ...testGrade,
        name: 'Joshua Dubar Grade 4',
        teams: [],
        season: season._id
    })
    const grade3 = await fourthGrade.save()

    // add a test grade object to database for fixtures for second season
    const fifthGrade = new Grade({
        ...testGrade,
        name: 'Joshua Dubar Grade 5',
        teams: [],
        season: season1._id
    })
    const grade4 = await fifthGrade.save()

    // add the new grades as a grade to the season
    season.grades.push(grade._id)
    season.grades.push(grade1._id)
    season.grades.push(grade2._id)
    season.grades.push(grade3._id)
    await season.save()

    season1.grades.push(grade4._id)
    await season1.save()

    // add a new team object to database
    const newTeam = new Team({
        ...testTeam,
        admin: env.auth_tokens[0][0],
        grades: [grade._id],
        players: []
    })
    const team = await newTeam.save()

    // add the new team as a team to the grade
    grade.teams.push(team._id)
    await grade.save()

    // add a test team object to database but isn't in a grade
    const secondTeam = new Team({
        ...testTeam,
        name: 'Josh Dubar Team 2',
        admin: env.auth_tokens[0][0],
        grades: [],
        players: []
    })
    const team1 = await secondTeam.save()

    // add test team objects to database for fixture
    const thirdTeam = new Team({
        ...testTeam,
        name: 'Josh Dubar Team 3',
        admin: env.auth_tokens[0][0],
        grades: [],
        players: []
    })
    const team2 = await thirdTeam.save()

    const fourthTeam = new Team({
        ...testTeam,
        name: 'Josh Dubar Team 4',
        admin: env.auth_tokens[0][0],
        grades: [],
        players: []
    })
    const team3 = await fourthTeam.save()

    // add the new teams to grade3
    grade3.teams.push(team._id)
    grade3.teams.push(team2._id)
    grade3.teams.push(team3._id)
    await grade3.save()

    grade4.teams.push(team2._id)
    grade4.teams.push(team3._id)
    await grade4.save()


    env.league0_id = league._id.toString()
    env.season0_id = season._id.toString()
    env.season1_id = season1._id.toString()
    env.grade0_id = grade._id.toString()
    env.grade1_id = grade1._id.toString()
    env.grade2_id = grade2._id.toString()
    env.grade3_id = grade3._id.toString()
    env.grade4_id = grade4._id.toString()
    env.team0_id = team._id.toString()
    env.team1_id = team1._id.toString()
    env.team2_id = team2._id.toString()
    env.team3_id = team3._id.toString()
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
        expect(res.body.data[0].games).toStrictEqual([])
        expect(res.body.data[0].players).toStrictEqual([])
        expect(res.body.data[0].admin).toBe(env.auth_tokens[0][0])
        expect(res.body.data[0].grades).toStrictEqual([env.grade0_id])
    })
})

describe('Integration Testing: adding team to a grade', () => {
    test('Adding team to a grade when its already part of another grade in the season should return error', async () => {
        const res = await request.post(`/api/grade/${env.grade1_id}/team`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                teamId: env.team0_id,
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Team already exists in a grade for the season')
    })

    test('Should be able to add team to a grade that is not in any other grade for the season', async () => {
        const res = await request.post(`/api/grade/${env.grade0_id}/team`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)
            .send({
                teamId: env.team1_id,
            })

        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.data.difficulty).toBe(testGrade.difficulty)
        expect(res.body.data.gender).toBe(testGrade.gender)
        expect(res.body.data.name).toBe(testGrade.name)
        expect(res.body.data.season).toBe(env.season0_id)
        expect(res.body.data.teams).toStrictEqual([env.team0_id, env.team1_id])
    })
})

describe('Integration Testing: deleting a grade', () => {
    test('Deleting a grade with a nonexistent id should return an error', async () => {
        const res = await request.delete(`/api/grade/aaaabbbbcccc`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Grade does not exist')
    })

    test('Deleting a grade with an invalid MongoDB object id should return an error', async () => {
        const res = await request.delete(`/api/grade/1337`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Grade does not exist')
    })

    test('Should be able to delete a grade with valid id', async () => {
        const res = await request.delete(`/api/grade/${env.grade2_id}`)
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)

        expect(res.statusCode).toBe(204)
    })
})

describe('Integration Testing: creating a round', () => {
    test('Should not be able to create round for an invalid grade', async () => {
        const res = await request.post('/api/grade/badgradeid/round')
            .set('Authorization', `Bearer ${env.auth_tokens[0][1]}`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Grade does not exist')
    })

    test('User should not be able to create round if they are not league admin', async () => {
        const res = await request.post(`/api/grade/${env.grade0_id}/round`)
            .set('Authorization', `Bearer ${env.auth_tokens[2][1]}`)

        expect(res.statusCode).toBe(403)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('User is not an admin')
    })

    test('League admin should be able to create round', async () => {
        const res = await request.post(`/api/grade/${env.grade0_id}/round`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)

        expect(res.statusCode).toBe(201)
        expect(res.body.success).toBe(true)
        expect(res.body.data.games).toStrictEqual([])
        expect(res.body.data.grade).toBe(env.grade0_id)
    })
})

describe('Integration Testing: creating a fixture for a grade', () => {
    test('Creating fixture for a grade with a nonexistent id should return an error', async () => {
        const res = await request.post('/api/grade/badgradeid/fixture')
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Grade does not exist')
    })

    test('Creating fixture with less than 2 teams should return an error', async () => {
        const res = await request.post(`/api/grade/${env.grade3_id}/fixture`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                teamIds: [env.team0_id],
                numRounds: 3,
                datesAndLocations: [{
                    "dateStart": "2021-09-11T12:23:34.944Z",
                    "dateFinish": "2021-09-11T12:23:35.944Z",
                    "locationName": "Joshua Dubar Sports Centre",
                    "location": {
                        "type": "Point",
                        "coordinates": [144.96305759999998, -37.8136276]
                    }
                }]
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Need at least 2 teams')
    })

    test('Creating fixture with teams not in the grade should return an error', async () => {
        const res = await request.post(`/api/grade/${env.grade4_id}/fixture`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                teamIds: [env.team0_id, env.team2_id],
                numRounds: 3,
                datesAndLocations: [{
                    "dateStart": "2021-09-11T12:23:34.944Z",
                    "dateFinish": "2021-09-11T12:23:35.944Z",
                    "locationName": "Joshua Dubar Sports Centre",
                    "location": {
                        "type": "Point",
                        "coordinates": [144.96305759999998, -37.8136276]
                    }
                }]
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Team is not added to grade')
    })

    test('Creating fixture with non-existent team should return an error', async () => {
        const res = await request.post(`/api/grade/${env.grade3_id}/fixture`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                teamIds: ['joshdubar', 'dubarjosh'],
                numRounds: 3
            })

        expect(res.statusCode).toBe(404)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Some team does not exist')
    })

    test('Creating fixture with no datesAndLocations should return an error', async () => {
        const res = await request.post(`/api/grade/${env.grade3_id}/fixture`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                teamIds: [env.team2_id, env.team3_id],
                numRounds: 3
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Dates and locations are invalid')
    })

    test('Creating fixture with empty datesAndLocations should return an error', async () => {
        const res = await request.post(`/api/grade/${env.grade3_id}/fixture`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                teamIds: [env.team2_id, env.team3_id],
                numRounds: 3,
                datesAndLocations: []
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Dates and locations are invalid')
    })

    test('Creating fixture with datesAndLocations without locationName should return an error', async () => {
        const res = await request.post(`/api/grade/${env.grade3_id}/fixture`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                teamIds: [env.team2_id, env.team3_id],
                numRounds: 3,
                datesAndLocations: [{
                    "dateStart": "2021-09-11T12:23:34.944Z",
                    "dateFinish": "2021-09-11T12:23:35.944Z",
                    "location": {
                        "type": "Point",
                        "coordinates": [144.96305759999998, -37.8136276]
                    }
                }]
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('Dates and locations are invalid')
    })

    test('Creating fixture with no number of rounds should return an error', async () => {
        const res = await request.post(`/api/grade/${env.grade3_id}/fixture`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                teamIds: [env.team2_id, env.team3_id],
                datesAndLocations: [{
                    "dateStart": "2021-09-11T12:23:34.944Z",
                    "dateFinish": "2021-09-11T12:23:35.944Z",
                    "locationName": "Joshua Dubar Sports Centre",
                    "location": {
                        "type": "Point",
                        "coordinates": [144.96305759999998, -37.8136276]
                    }
                }]
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('numRounds is invalid')
    })

    test('Creating fixture with number of rounds <= 0 should return an error', async () => {
        const res = await request.post(`/api/grade/${env.grade3_id}/fixture`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                teamIds: [env.team2_id, env.team3_id],
                numRounds: 0,
                datesAndLocations: [{
                    "dateStart": "2021-09-11T12:23:34.944Z",
                    "dateFinish": "2021-09-11T12:23:35.944Z",
                    "locationName": "Joshua Dubar Sports Centre",
                    "location": {
                        "type": "Point",
                        "coordinates": [144.96305759999998, -37.8136276]
                    }
                }]
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('numRounds is invalid')
    })

    test('Creating fixture with number of rounds that cannot fit within season should return an error', async () => {
        const res = await request.post(`/api/grade/${env.grade3_id}/fixture`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                teamIds: [env.team2_id, env.team3_id],
                numRounds: 69,
                datesAndLocations: [{
                    "dateStart": "2021-09-11T12:23:34.944Z",
                    "dateFinish": "2021-09-11T12:23:35.944Z",
                    "locationName": "Joshua Dubar Sports Centre",
                    "location": {
                        "type": "Point",
                        "coordinates": [144.96305759999998, -37.8136276]
                    }
                }]
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('numRounds cannot fit within the season')
    })

    test('Creating fixture with 2 teams and 1 dateLocation per round with 2 rounds \
         should create a fixture with no teamsOnBye', async () => {
        const res = await request.post(`/api/grade/${env.grade4_id}/fixture`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                teamIds: [env.team2_id, env.team3_id],
                numRounds: 2,
                datesAndLocations: [{
                    "dateStart": "2021-09-11T12:23:34.944Z",
                    "dateFinish": "2021-09-11T12:23:35.944Z",
                    "locationName": "Joshua Dubar Sports Centre",
                    "location": {
                        "type": "Point",
                        "coordinates": [144.96305759999998, -37.8136276]
                    }
                }]
            })

        expect(res.statusCode).toBe(201)
        expect(res.body.success).toBe(true)
        expect(res.body.data.length).toBe(2)
        expect(res.body.data[0].games.length).toBe(1)
        expect(res.body.data[0].teamsOnBye).toStrictEqual([])
        expect(res.body.data[1].games.length).toBe(1)
        expect(res.body.data[1].teamsOnBye).toStrictEqual([])
    })

    test('Creating fixture with three teams and 1 dateLocation per round with 2 rounds \
         should create a fixture with teamsOnBye', async () => {
        const res = await request.post(`/api/grade/${env.grade3_id}/fixture`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                teamIds: [env.team0_id, env.team2_id, env.team3_id],
                numRounds: 2,
                datesAndLocations: [{
                    "dateStart": "2021-09-11T12:23:34.944Z",
                    "dateFinish": "2021-09-11T12:23:35.944Z",
                    "locationName": "Joshua Dubar Sports Centre",
                    "location": {
                        "type": "Point",
                        "coordinates": [144.96305759999998, -37.8136276]
                    }
                }]
            })

        expect(res.statusCode).toBe(201)
        expect(res.body.success).toBe(true)
        expect(res.body.data.length).toBe(2)
        expect(res.body.data[0].games.length).toBe(1)
        expect(res.body.data[0].teamsOnBye.length).toBe(1)
        expect(res.body.data[1].games.length).toBe(1)
        expect(res.body.data[1].teamsOnBye.length).toBe(1)
    })

    test('Creating fixture to grade with a fixture already should return an error', async () => {
        const res = await request.post(`/api/grade/${env.grade3_id}/fixture`)
            .set('Authorization', `Bearer ${env.auth_tokens[1][1]}`)
            .send({
                teamIds: [env.team0_id, env.team2_id, env.team3_id],
                numRounds: 2,
                datesAndLocations: [{
                    "dateStart": "2021-09-11T12:23:34.944Z",
                    "dateFinish": "2021-09-11T12:23:35.944Z",
                    "locationName": "Joshua Dubar Sports Centre",
                    "location": {
                        "type": "Point",
                        "coordinates": [144.96305759999998, -37.8136276]
                    }
                }]
            })

        expect(res.statusCode).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.error).toBe('This grade already has a fixture')
    })
})