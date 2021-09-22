const leagueController = require('../../controllers/leagueController')
const League = require('../../models/league')
const Season = require('../../models/season')
const User = require('../../models/user')
const { mockRequest, mockResponse, mockNext } = require('./test-utils')

beforeEach(() => {
    jest.restoreAllMocks()
})

describe('Unit Testing: getAllLeagues in leagueController', () => {
    test('Getting existing leagues (2) should return 2 leagues', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()
        const allLeagues = [
            {
                _id: '611a8a661fb4c81d84a5512c',
                admins: ['611a8a311fb4c81d84a55126'],
                seasons: ['611b9bea1f374212cc10bb59'],
                name: 'Joshua Basketball Association',
                organisation: 'JoshuaDubar',
                creator: '611a8a311fb4c81d84a55126',
                __v: 8,
            },
            {
                _id: '611bbfe2aaa94829988d0b18',
                admins: ['611a8a311fb4c81d84a55126'],
                seasons: [],
                name: 'Joshua Basketball Association',
                organisation: 'JoshuaDubar',
                creator: '611a8a311fb4c81d84a55126',
                __v: 0,
            },
        ]

        League.find = jest.fn().mockResolvedValue(allLeagues)
        League.find.mockImplementationOnce(() => ({
            lean: jest.fn().mockReturnValue(allLeagues),
        }))

        await leagueController.getAllLeagues(req, res, next)

        const actualRes = {
            status: 200,
            json: {
                success: true,
                data: allLeagues,
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })

    test('Getting no existing leagues should return no leagues', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        League.find = jest.fn().mockResolvedValue([])
        League.find.mockImplementationOnce(() => ({
            lean: jest.fn().mockReturnValue([]),
        }))

        await leagueController.getAllLeagues(req, res, next)

        const actualRes = {
            status: 200,
            json: {
                success: true,
                data: [],
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })
})

describe('Unit Testing: createLeague in leagueController', () => {
    test('Creating league with valid leagueName and organisationName should create a league', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        req.user = new User({
            _id: '611bbfe2aaa94829988d0b18',
            leagues: [],
        })

        const leagueDetails = {
            _id: '611bbfe2aaa94829988d0b18',
            admins: ['611a8a311fb4c81d84a55126'],
            seasons: [],
            name: 'Joshua Basketball Association',
            organisation: 'JoshuaDubar',
            creator: '611a8a311fb4c81d84a55126',
            __v: 0,
        }

        req.body = {
            leagueName: 'Joshua Basketball Association',
            organisationName: 'JoshuaDubar',
        }

        User.prototype.save = jest.fn().mockImplementationOnce()
        League.prototype.save = jest.fn().mockResolvedValue(leagueDetails)
        await leagueController.createLeague(req, res, next)

        const actualRes = {
            status: 201,
            json: {
                success: true,
                data: leagueDetails,
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })
})

describe('Unit Testing: getAllLeagueSeasons in leagueController', () => {
    test('Getting league seasons with 1 season should return populated season', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        const leagueDetails = {
            _id: '611a8a661fb4c81d84a5512c',
            admins: ['611a8a311fb4c81d84a55126'],
            seasons: ['611b9bea1f374212cc10bb59'],
            name: 'Joshua Basketball Association',
            organisation: 'JoshuaDubar',
            creator: '611a8a311fb4c81d84a55126',
            __v: 8,
        }
        req.league = new League(leagueDetails)

        const expectedSeasons = [
            {
                _id: '611b9bea1f374212cc10bb59',
                status: 'completed',
                grades: [],
                name: 'Summer 2020/2021',
                league: '611a8a661fb4c81d84a5512c',
                dateStart: '2021-08-12T12:23:34.944Z',
                dateFinish: '2021-08-14T12:23:34.944Z',
                __v: 0,
            },
        ]

        // We expect execPopulate to populate the seasons array with the full document
        const populatedObj = {
            ...leagueDetails,
            seasons: expectedSeasons,
        }

        League.prototype.execPopulate = jest.fn().mockResolvedValue(populatedObj)

        await leagueController.getAllLeagueSeasons(req, res, next)

        const actualRes = {
            status: 200,
            json: {
                success: true,
                data: expectedSeasons,
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })

    test('Getting league seasons with no seasons should return empty seasons array', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        const leagueDetails = {
            _id: '611a8a661fb4c81d84a5512c',
            admins: ['611a8a311fb4c81d84a55126'],
            seasons: [],
            name: 'Joshua Basketball Association',
            organisation: 'JoshuaDubar',
            creator: '611a8a311fb4c81d84a55126',
            __v: 8,
        }
        req.league = new League(leagueDetails)

        League.prototype.execPopulate = jest.fn().mockResolvedValue(leagueDetails)

        await leagueController.getAllLeagueSeasons(req, res, next)

        const actualRes = {
            status: 200,
            json: {
                success: true,
                data: [],
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })
})

describe('Unit Testing: createLeagueSeason in leagueController', () => {
    test('Creating season with valid seasonName, seasonStart and seasonFinish should create a season', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        req.league = new League({
            _id: '611bbfe2aaa94829988d0b18',
            admins: ['611a8a311fb4c81d84a55126'],
            seasons: [],
            name: 'Joshua Basketball Association',
            organisation: 'JoshuaDubar',
            creator: '611a8a311fb4c81d84a55126',
            __v: 0,
        })

        req.body = {
            seasonName: 'jdubzSeason',
            seasonStart: '2021-08-12T12:23:34.944Z',
            seasonFinish: '2021-08-24T12:23:34.944Z',
        }

        const expectedSeason = new Season({
            name: 'jdubzSeason',
            dateStart: '2021-08-12T12:23:34.944Z',
            dateFinish: '2021-08-24T12:23:34.944Z',
            league: '611bbfe2aaa94829988d0b18',
            grades: [],
            __v: 0,
            status: 'completed',
        })

        League.prototype.save = jest.fn().mockImplementationOnce()
        Season.prototype.save = jest.fn().mockResolvedValue(expectedSeason)
        await leagueController.createLeagueSeason(req, res, next)

        const actualRes = {
            status: 201,
            json: {
                success: true,
                data: expectedSeason,
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })
})

describe('Unit Testing: createLeagueAdmins in leagueController', () => {
    test('Adding new user with valid id should be added to League.admins', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        const leagueDetails = {
            _id: '611bbfe2aaa94829988d0b18',
            admins: ['611a8a311fb4c81d84a55126'],
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

        const expectedLeague = new League({
            ...leagueDetails,
            admins: ['611a8ba31fb4c81d84a5513b', '611a8a311fb4c81d84a55126'],
        })

        User.find = jest.fn().mockResolvedValue([new User(user)])
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

    test('Adding existing admin with valid id should return same League.admins', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        const leagueDetails = {
            _id: '611bbfe2aaa94829988d0b18',
            admins: ['611a8a311fb4c81d84a55126', '611a8ba31fb4c81d84a5513b'],
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

    test('Adding user with invalid id should return some users do not exist error', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        req.league = new League({
            _id: '611bbfe2aaa94829988d0b18',
            admins: ['611a8a311fb4c81d84a55126'],
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
})

describe('Unit Testing: deleteLeagueAdmins in leagueController', () => {
    test('Deleting existing admin with valid id should be removed from League.admins', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        const leagueDetails = {
            _id: '611bbfe2aaa94829988d0b18',
            admins: ['611a8a311fb4c81d84a55126', '611a8ba31fb4c81d84a5513b'],
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

        const expectedLeague = new League({
            ...leagueDetails,
            admins: ['611a8a311fb4c81d84a55126'],
        })

        User.findOneAndUpdate = jest
            .fn()
            .mockResolvedValue(new User({ ...user, leagues: ['611bbfe2aaa94829988d0b18'] }))

        League.findOneAndUpdate = jest.fn().mockResolvedValue(expectedLeague)

        await leagueController.deleteLeagueAdmins(req, res, next)

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

    test('Deleting non-existing admin with valid id should return original League.admins', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        const leagueDetails = {
            _id: '611bbfe2aaa94829988d0b18',
            admins: ['611a8a311fb4c81d84a55126'],
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

        await leagueController.deleteLeagueAdmins(req, res, next)

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

    test('Deleting user with invalid id should return some users do not exist error', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        req.league = new League({
            _id: '611bbfe2aaa94829988d0b18',
            admins: ['611a8a311fb4c81d84a55126'],
            seasons: [],
            name: 'Joshua Basketball Association',
            organisation: 'JoshuaDubar',
            creator: '611a8a311fb4c81d84a55126',
            __v: 0,
        })

        req.body = {
            adminIds: ['jdubz'],
        }

        User.find = jest.fn().mockResolvedValue([])
        User.findOneAndUpdate = jest.fn().mockResolvedValue(null)

        await leagueController.deleteLeagueAdmins(req, res, next)

        const actualNext = {
            status: 404,
            message: 'Some users do not exist',
        }

        expect(next).toHaveBeenCalledWith(actualNext)
    })
})

describe('Unit Testing: deleteLeague in leagueController', () => {
    test('Deleting league with valid leagueId should delete the league', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        req.league = new League({
            _id: '611bbfe2aaa94829988d0b18',
            admins: ['611a8a311fb4c81d84a55126'],
            seasons: [],
            name: 'Joshua Basketball Association',
            organisation: 'JoshuaDubar',
            creator: '611a8a311fb4c81d84a55126',
            __v: 0
        })

        League.prototype.deleteOne = jest.fn().mockImplementationOnce()

        await leagueController.deleteLeague(req, res, next)

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(204)
    })
})
