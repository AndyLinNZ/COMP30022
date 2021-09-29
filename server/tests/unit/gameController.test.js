const gameController = require('../../controllers/gameController')
const Game = require('../../models/game')
const Round = require('../../models/round')
const Player = require('../../models/player')
const PlayerStat = require('../../models/playerStat')
const { mockRequest, mockResponse, mockNext } = require('./test-utils')

beforeEach(() => {
    jest.restoreAllMocks()
})

describe('Unit Testing: updateGamePlayerStats in gameController', () => {
    beforeEach(() => {
        this.exampleReqBody = {
            team1: {
                '613b1a98c541333f1490ce10': {
                    points: 3,
                    assists: 123,
                    rebounds: {
                        offensive: 1,
                        defensive: 2,
                    },
                    minutesPlayed: 50,
                },
            },
            team2: {
                '613b1ad2c541333f1490ce22': {
                    points: 7,
                    assists: 13,
                    rebounds: {
                        offensive: 9,
                        defensive: 7,
                    },
                    minutesPlayed: 2,
                },
            },
        }
    })

    test('Updating a game with valid team1 and team2 inputs with no existing playerstats should \
        create new playerstats and update a game', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        req.body = this.exampleReqBody

        const gameDetails = {
            dateStart: new Date('2021-08-12T10:00:00.000Z'),
            dateFinish: new Date('2021-08-14T10:00:00.000Z'),
            team1: {
                team: '6131e8b7f69a130fa021f6fd',
                playersStats: [],
            },
            team2: {
                team: '6131e8b7f69a130fa021f6fe',
                playersStats: [],
            },
            locationName: 'Joshua SENPAl Stadium',
            location: {
                type: 'Point',
                coordinates: [123.456, 88.666],
            },
            round: '612788ed698aac7c50c3d377',
        }
        req.game = new Game(gameDetails)

        req.round = new Round({
            _id: '612788ed698aac7c50c3d377',
            grade: '612788ed698aac7c50c3d3b6',
        })

        const expectedGame = new Game({
            ...gameDetails,
            team1: {
                ...gameDetails.team1,
                playerStats: [{
                    playerId: '613b1a98c541333f1490ce10',
                    ...req.body.team1['613b1a98c541333f1490ce10'],
                }],
            },
            team2: {
                ...gameDetails.team2,
                playerStats: [{
                    playerId: '613b1ad2c541333f1490ce22',
                    ...req.body.team2['613b1ad2c541333f1490ce22'],
                }],
            },
        })

        Player.findById = jest.fn().mockImplementation(() => Promise.resolve(true))
        PlayerStat.prototype.save = jest.fn().mockImplementation()
        Game.prototype.save = jest.fn().mockResolvedValue(expectedGame)

        await gameController.updateGamePlayerStats(req, res, next)

        const actualRes = {
            status: 200,
            json: {
                success: true,
                data: expectedGame,
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })

    test('Updating a game with valid team1 and team2 inputs with team1 existing playerStat \
        should update team1 playerStat and create new team2 playerStat and update a game', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        req.body = this.exampleReqBody

        const gameDetails = {
            dateStart: new Date('2021-08-12T10:00:00.000Z'),
            dateFinish: new Date('2021-08-14T10:00:00.000Z'),
            team1: {
                team: '6131e8b7f69a130fa021f6fd',
                playersStats: [{
                    playerId: '613b1a98c541333f1490ce10',
                    ...req.body.team1['613b1a98c541333f1490ce10'],
                }],
            },
            team2: {
                team: '6131e8b7f69a130fa021f6fe',
                playersStats: [],
            },
            locationName: 'Joshua SENPAl Stadium',
            location: {
                type: 'Point',
                coordinates: [123.456, 88.666],
            },
            round: '612788ed698aac7c50c3d377',
        }
        req.game = new Game(gameDetails)

        req.round = new Round({
            _id: '612788ed698aac7c50c3d377',
            grade: '612788ed698aac7c50c3d3b6',
        })

        const expectedGame = new Game({
            ...gameDetails,
            team2: {
                ...gameDetails.team2,
                playerStats: [{
                    playerId: '613b1ad2c541333f1490ce22',
                    ...req.body.team2['613b1ad2c541333f1490ce22'],
                }],
            },
        })

        Player.findById = jest.fn().mockImplementation(() => Promise.resolve(true))
        PlayerStat.prototype.save = jest.fn().mockImplementation()
        Game.prototype.save = jest.fn().mockResolvedValue(expectedGame)

        await gameController.updateGamePlayerStats(req, res, next)

        const actualRes = {
            status: 200,
            json: {
                success: true,
                data: expectedGame,
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })
})
