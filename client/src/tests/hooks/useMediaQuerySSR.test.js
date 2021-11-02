import { useMediaQuerySSR } from 'hooks'
import { renderHook } from 'utils/test-utils'
import { useMediaQuery } from '@chakra-ui/react'

jest.mock('@chakra-ui/react', () => ({
    ...jest.requireActual('@chakra-ui/react'),
    useMediaQuery: jest.fn(),
}))

describe('useMediaQuerySSR', () => {
    test('returns true', () => {
        useMediaQuery.mockReturnValue([true])
        const { result } = renderHook(() => useMediaQuerySSR(1000))
        expect(result.current).toBe(true)
    })

    test('returns false', () => {
        useMediaQuery.mockReturnValue([false])
        const { result } = renderHook(() => useMediaQuerySSR(1100))
        expect(result.current).toBe(false)
    })
})
