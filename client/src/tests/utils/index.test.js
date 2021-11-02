import {
    extractData,
    isBrowser,
    isLoggedIn,
    getLeagueFromUser,
    getSeasonFromUser,
    getTeamFromUser,
    getHumanReadableDate,
    createErrorMessage,
} from 'utils'

jest.mock('next/router', () => ({
    query: {
        leagueId: '123',
        seasonId: 'abc',
        teamId: 'xyz',
    },
}))

describe('utils', () => {
    describe('extractData', () => {
        test('correct output', () => {
            expect(extractData({ data: { data: 'hello' } })).toBe('hello')
        })
    })

    describe('isBrowser', () => {
        test('window should not be undefined', () => {
            expect(isBrowser()).toBe(true)
        })

        test('window is undefined', () => {
            const { window } = global
            delete global.window
            expect(isBrowser()).toBe(false)
            global.window = window
        })
    })

    describe('isLoggedIn', () => {
        describe('window is not undefined', () => {
            test('local storage does not have token', () => {
                expect(isLoggedIn()).toBe(false)
            })
            test('local storage has token', () => {
                global.localStorage.setItem('token', 'abc')
                expect(isLoggedIn()).toBe(true)
            })
        })

        describe('window is undefined', () => {
            const { window } = global
            beforeAll(() => {
                delete global.window
            })
            afterAll(() => {
                global.window = window
            })

            test('is false', () => {
                expect(isLoggedIn()).toBe(false)
            })
        })
    })

    describe('getLeagueFromUser', () => {
        test('correct output', () => {
            expect(getLeagueFromUser({ leagues: [{ _id: '123' }, { _id: '456' }] })).toEqual({
                _id: '123',
            })
        })
    })
    describe('getSeasonFromUser', () => {
        test('correct output', () => {
            expect(
                getSeasonFromUser({ leagues: [{ _id: '123', seasons: [{ _id: 'abc' }] }] })
            ).toEqual({
                _id: 'abc',
            })
        })
    })
    describe('getTeamFromUser', () => {
        test('correct output', () => {
            expect(getTeamFromUser({ teams: [{ _id: 'xyz' }, { __id: 'npm' }] })).toEqual({
                _id: 'xyz',
            })
        })
    })

    describe('getHumanReadableDate', () => {
        test('correct output', () => {
            expect(getHumanReadableDate('2021-01-01')).toEqual('Jan 1, 2021')
        })
    })

    describe('createErrorMessage', () => {
        test('matching error message', () => {
            expect(createErrorMessage('Input pairing not unique.', 'pairing', 'default')).toEqual(
                'pairing'
            )
        })

        test('no matching error message', () => {
            expect(createErrorMessage('other message', 'pairing', 'default')).toEqual('default')
        })
    })
})
