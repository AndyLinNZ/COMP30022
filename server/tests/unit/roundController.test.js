const roundController = require('../../controllers/roundController')
const Grade = require('../../models/grade')
const Team = require('../../models/team')
const Game = require('../../models/game')
const Round = require('../../models/round')
const { mockRequest, mockResponse, mockNext } = require('./test-utils')

beforeEach(() => {
    jest.restoreAllMocks()
})

describe('Unit Testing: createGame in roundController', () => {
    test('Creating a game with valid team1 id and team2 id should create a round game', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        req.body = {
            start: '2021-08-12T10:00:00.000Z',
            finish: '2021-08-12T11:00:00.000Z',
            venue_name: 'Joshua SENPAl Stadium',
            game_location: {
                type: 'Point',
                coordinates: [123.456, 88.666]
            },
            team1_id: '6131e8b7f69a130fa021f6fd',
            team2_id: '6131e8b7f69a130fa021f6fe'
        }

        const expectedGame = new Game({
            dateStart: new Date(req.body.start),
            dateFinish: new Date(req.body.finish),
            team1: {
                team: req.body.team1_id,
                playersStats: []
            },
            team2: {
                team: req.body.team2_id,
                playersStats: []
            },
            locationName: req.body.venue_name,
            location: req.body.game_location,
            round: '612788ed698aac7c50c3d377'
        })

        req.grade = new Grade({
            _id: '612788ed698aac7c50c3d3b6',
            name: 'jdubz grade',
            gender: 'male',
            difficulty: 'A',
            season: '60741060d14008bd0efff9d5',
            teams: [],
            fixture: []
        })

        req.round = new Round({
            _id: '612788ed698aac7c50c3d377',
            grade: '612788ed698aac7c50c3d3b6'
        })

        const team1 = new Team({
            teamName: 'joshua dubar team1',
            admin: '611a8a311fb4c81d84a55126',
            _id: '6131e8b7f69a130fa021f6fd',
            grades: [],
            players: [],
            games: [],
            __v: 0,
        })
        const team2 = new Team({
            teamName: 'joshua dubar team2',
            admin: '611a8a311fb4c81d84a55126',
            _id: '6131e8b7f69a130fa021f6fe',
            grades: [],
            players: [],
            games: [],
            __v: 0,
        })
        Team.findById = jest.fn()
            .mockImplementationOnce(() => Promise.resolve(team1))
            .mockImplementationOnce(() => Promise.resolve(team2))

        Game.prototype.save = jest.fn().mockResolvedValue(expectedGame)
        Team.findOneAndUpdate = jest.fn().mockImplementation()
        Round.findOneAndUpdate = jest.fn().mockImplementation()

        await roundController.createGame(req, res, next)

        const actualRes = {
            status: 201,
            json: {
                success: true,
                data: expectedGame
            }
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })
    
    test('Creating a game with invalid team1 id should throw team not found error', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        req.body = {
            start: '2021-08-12T10:00:00.000Z',
            finish: '2021-08-12T11:00:00.000Z',
            venue_name: 'Joshua SENPAl Stadium',
            game_location: {
                type: 'Point',
                coordinates: [123.456, 88.666]
            },
            team1_id: 'joshuasandwich',
            team2_id: '6131e8b7f69a130fa021f6fe'
        }

        await roundController.createGame(req, res, next)

        const actualNext = {
            status: 404,
            message: 'Team does not exist',
        }

        expect(next).toHaveBeenCalledWith(actualNext)
    })

    test('Creating a game with invalid team2 id should throw team not found error', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        req.body = {
            start: '2021-08-12T10:00:00.000Z',
            finish: '2021-08-12T11:00:00.000Z',
            venue_name: 'Joshua SENPAl Stadium',
            game_location: {
                type: 'Point',
                coordinates: [123.456, 88.666]
            },
            team2_id: 'joshuasandwich',
            team1_id: '6131e8b7f69a130fa021f6fe'
        }

        await roundController.createGame(req, res, next)

        const actualNext = {
            status: 404,
            message: 'Team does not exist',
        }

        expect(next).toHaveBeenCalledWith(actualNext)
    })
})


describe('Unit Testing: deleteRound in roundController', () => {
    test('Deleting round with valid roundId should delete the season', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        req.round = new Round({
            _id: '60741060d14008bd0efff9d5',
            grade: '60741060d14008bd0efaaaaa',
            dateStart: '2021-08-12T12:23:34.944Z',
        })

        Round.prototype.deleteOne = jest.fn().mockImplementationOnce()

        await roundController.deleteRound(req, res, next)

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(204)
    })
})
