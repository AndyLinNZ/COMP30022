const gradeController = require('../../controllers/gradeController')
const Grade = require('../../models/grade')
const Team = require('../../models/team')
const { mockRequest, mockResponse, mockNext } = require('./test-utils')

describe('Unit Testing: getAllGradeTeams in gradeController', () => {
    test('Getting grade teams with 1 team should return populated team', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        const gradeDetails = {
            _id: '612788ed698aac7c50c3d3b6',
            name: 'jdubz',
            gender: 'male',
            difficulty: 'A',
            season: '60741060d14008bd0efff9d5',
            teams: ['611ba6a199599722e4d01c38'],
        }
        req.grade = new Grade(gradeDetails)

        const expectedTeams = [
            {
                totalPoints: 0,
                totalWins: 0,
                totalLosses: 0,
                totalDraws: 0,
                gameResults: [],
                _id: '611ba6a199599722e4d01c38',
                name: 'jdubz',
                grade: '612788ed698aac7c50c3d3b6',
                __v: 0,
            },
        ]

        // We expect execPopulate to populate the teams array with the full document
        const populatedObj = {
            ...gradeDetails,
            teams: expectedTeams,
        }

        Grade.prototype.execPopulate = jest.fn().mockResolvedValue(populatedObj)

        await gradeController.getAllGradeTeams(req, res, next)

        const actualRes = {
            status: 200,
            json: {
                success: true,
                data: expectedTeams,
            },
        }

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(actualRes.status)
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith(actualRes.json)
    })

    test('Getting grade teams with no teams should return empty teams array', async () => {
        const req = mockRequest()
        const res = mockResponse()
        const next = mockNext()

        const gradeDetails = {
            _id: '612788ed698aac7c50c3d3b6',
            name: 'jdubz',
            gender: 'male',
            difficulty: 'A',
            season: '60741060d14008bd0efff9d5',
            teams: [],
        }
        req.grade = new Grade(gradeDetails)

        Grade.prototype.execPopulate = jest.fn().mockResolvedValue(gradeDetails)

        await gradeController.getAllGradeTeams(req, res, next)

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
