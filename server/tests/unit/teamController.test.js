const teamController = require('../../controllers/teamController')
const User = require('../../models/user')
const Team = require('../../models/team')
const Player = require('../../models/player')
const { mockRequest, mockResponse, mockNext } = require('./test-utils')

beforeEach(() => {
    jest.restoreAllMocks()
})

describe('Unit Testing: createTeam in teamController', () => {
    test('Creating team with valid teamName should create a team', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        req.user = new User({
            _id: '611a8ba31fb4c81d84a5513b',
            email: 'jdubz@dribblr.com',
            password: 'Password!',
            firstName: 'Joshua',
            lastName: 'Dubar',
            leagues: [],
            teams: [],
        })

        req.body = {
            teamName: 'joshua dubar team',
        }

        const expectedTeam = new Team({
            name: 'joshua dubar team',
            admin: '611a8a311fb4c81d84a55126',
            grades: [],
            players: [],
            games: [],
            __v: 0,
        })

        User.prototype.save = jest.fn().mockImplementationOnce()
        Team.prototype.save = jest.fn().mockResolvedValue(expectedTeam)
        await teamController.createTeam(req, res, next)

        const actualRes = {
            status: 201,
            json: {
                success: true,
                data: expectedTeam,
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })
})

describe('Unit Testing: addPlayerToTeam in teamController', () => {
    test('Adding new player with valid name should be added to team.players', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        const playerDetails = {
            name: 'joshua dubar player',
            _id: '613472896ef0dc42247c6520',
        }

        const teamDetails = {
            name: 'joshua dubar team',
            admin: '611a8a311fb4c81d84a55126',
            _id: '6131e8b7f69a130fa021f6fd',
            grades: [],
            players: [],
            games: [],
            __v: 0,
        }
        req.team = new Team(teamDetails)

        const user = {
            _id: '611a8a311fb4c81d84a55126',
            email: 'jdubz@dribblr.com',
            password: 'Password!',
            firstName: 'Joshua',
            lastName: 'Dubar',
            leagues: [],
            teams: [],
        }
        req.user = new User(user)

        req.body = {
            playerNames: [{ playerName: 'joshua dubar player' }],
        }

        const expectedTeam = new Team({ ...teamDetails, players: ['613472896ef0dc42247c6520'] })

        Player.prototype.save = jest.fn().mockResolvedValue(new Player(playerDetails))
        Player.findOne = jest.fn().mockResolvedValue(null)
        Player.findOneAndUpdate = jest
            .fn()
            .mockResolvedValue(new Player({ ...playerDetails, team: '6131e8b7f69a130fa021f6fd' }))
        Team.findOneAndUpdate = jest.fn().mockResolvedValue(expectedTeam)

        await teamController.addPlayerToTeam(req, res, next)

        const actualRes = {
            status: 200,
            json: {
                success: true,
                data: expectedTeam.players,
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })
})

describe('Unit Testing: updateTeam in teamController', () => {
    test('Updating a season with valid teamName should update the team', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        const teamDetails = {
            name: 'joshua dubar team',
            admin: '611a8a311fb4c81d84a55126',
            _id: '6131e8b7f69a130fa021f6fd',
            grades: [],
            players: [],
            games: [],
            __v: 0,
        }
        req.team = new Team(teamDetails)

        req.body = {
            teamName: 'Joshua Dubar Second Team',
        }

        const expectedTeam = new Team({
            ...teamDetails,
            name: req.body.teamName,
        })

        Team.findOneAndUpdate = jest.fn().mockResolvedValue(expectedTeam)

        await teamController.updateTeam(req, res, next)

        const actualRes = {
            status: 200,
            json: {
                success: true,
                data: expectedTeam,
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })
})
