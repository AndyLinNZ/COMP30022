const teamController = require('../../controllers/teamController')
const User = require('../../models/user')
const Team = require('../../models/team')
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
            __v: 0
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
