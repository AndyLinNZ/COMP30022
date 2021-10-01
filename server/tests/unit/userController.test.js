const userController = require('../../controllers/userController')
const User = require('../../models/user')
const { mockRequest, mockResponse, mockNext } = require('./test-utils')

describe('Unit Testing: getUserDetails in userController', () => {
    test('Getting user details with 1 league should return populated league', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        const userDetails = {
            _id: '612b9bc70ea7e4540fc2b30a',
            email: 'john.smith@example.com',
            firstName: 'John',
            lastName: 'Smith',
            leagues: ['612b9bdf0ea7e4540fc2b30f'],
            teams: ['611ba6a199599722e4d01c38']
        }
        req.user = new User(userDetails)

        const expectedLeagues = [
            {
                _id: '612b9bdf0ea7e4540fc2b30f',
                admins: ['612b9bc70ea7e4540fc2b30a'],
                creator: {
                    _id: '612b9bc70ea7e4540fc2b30a',
                    email: 'john.smith@example.com',
                    firstName: 'John',
                    lastName: 'Smith',
                },
                name: 'Joshua Basketball Association',
                organisation: 'JoshuaDubar',
                seasons: [],
            },
        ]
        const expectedTeams = [
            {
                games: [],
                _id: '611ba6a199599722e4d01c38',
                name: 'jdubz team',
                grades: [],
                players: [],
            }
        ]

        const populatedObj = {
            ...userDetails,
            leagues: expectedLeagues,
            teams: expectedTeams
        }

        User.prototype.execPopulate = jest.fn().mockResolvedValue(populatedObj)

        await userController.getUserDetails(req, res, next)

        const actualRes = {
            status: 200,
            json: {
                success: true,
                data: populatedObj,
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })

    test('Getting user details with no leagues should return empty leagues array', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        const userDetails = {
            _id: '612b9bc70ea7e4540fc2b30a',
            email: 'john.smith@example.com',
            firstName: 'John',
            lastName: 'Smith',
            leagues: [],
            teams: []
        }
        req.user = new User(userDetails)

        const populatedObj = {
            ...userDetails,
            leagues: [],
        }

        User.prototype.execPopulate = jest.fn().mockResolvedValue(populatedObj)

        await userController.getUserDetails(req, res, next)

        const actualRes = {
            status: 200,
            json: {
                success: true,
                data: populatedObj,
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })
})
