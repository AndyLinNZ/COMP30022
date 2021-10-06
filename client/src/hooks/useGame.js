import { useQuery } from 'react-query'
import { getGame } from 'api'
import { extractData } from 'utils'
import { useRouter } from 'next/router'

const useGame = (options = {}) => {
    const router = useRouter()
    const gameId = router.query.gameId
    const { data, isLoading, error } = useQuery(['game', gameId], getGame, {
        ...options,
        enabled: !!gameId,
    })
    const game = extractData(data)
    return { game, isLoading, error }
}

export default useGame
