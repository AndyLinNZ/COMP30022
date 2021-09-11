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
            teamName: 'joshua dubar team',
            admin: '611a8a311fb4c81d84a55126',
            grades: [],
            players: [],
            __v: 0,
            status: 'upcoming',
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
            _id: '613472896ef0dc42247c6520'
        }

        const teamDetails = {
            teamName: 'joshua dubar team',
            admin: '611a8a311fb4c81d84a55126',
            _id: '6131e8b7f69a130fa021f6fd',
            grades: [],
            players: [],
            __v: 0,
            status: 'upcoming',
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
            playerNames: ['joshua dubar player'],
        }

        const expectedTeam = new Team({ ...teamDetails, players: ['613472896ef0dc42247c6520'] })

        Player.prototype.save = jest.fn().mockResolvedValue(new Player(playerDetails))
        Player.findOneAndUpdate = jest.fn().mockResolvedValue(new Player({ ...playerDetails, team: '6131e8b7f69a130fa021f6fd' }))
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
    /*
    This test is saying no matter how many times I call this, I should get the same output/response
    test('Adding existing admin with valid id should return same League.admins', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        const leagueDetails = {
            _id: '611bbfe2aaa94829988d0b18',
            admin: ['611a8a311fb4c81d84a55126', '611a8ba31fb4c81d84a5513b'],
            seasons: [],
            name: 'Joshua Basketball Association',
            organisation: 'JoshuaDubar',
            creator: '611a8a311fb4c81d84a55126',
            __v: 0,
        }

        const user = {
            _id: '611a8ba31fb4c81d84a5513b',
            email: 'jdubz@dribblr.com',
            password: 'Password!',
            firstName: 'Joshua',
            lastName: 'Dubar',
            leagues: [],
            teams: [],
        }

        req.league = new League(leagueDetails)

        req.body = {
            adminIds: ['611a8ba31fb4c81d84a5513b'],
        }

        const expectedLeague = new League(leagueDetails)

        User.findOneAndUpdate = jest
            .fn()
            .mockResolvedValue(new User({ ...user, leagues: ['611bbfe2aaa94829988d0b18'] }))

        League.findOneAndUpdate = jest.fn().mockResolvedValue(expectedLeague)

        await leagueController.createLeagueAdmins(req, res, next)

        const actualRes = {
            status: 200,
            json: {
                success: true,
                data: expectedLeague.admins,
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })
    This test is saying if I input an invalid Player (eg. _id: joshdubar) then it should error
    test('Adding user with invalid id should return some users do not exist error', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        req.league = new League({
            _id: '611bbfe2aaa94829988d0b18',
            admin: ['611a8a311fb4c81d84a55126'],
            seasons: [],
            name: 'Joshua Basketball Association',
            organisation: 'JoshuaDubar',
            creator: '611a8a311fb4c81d84a55126',
            __v: 0,
        })

        req.body = {
            adminIds: ['jdubz'],
        }

        User.findOneAndUpdate = jest.fn().mockResolvedValue(null)

        await leagueController.createLeagueAdmins(req, res, next)

        const actualNext = {
            status: 404,
            message: 'Some users do not exist',
        }

        expect(next).toHaveBeenCalledWith(actualNext)
    })
    */
})
