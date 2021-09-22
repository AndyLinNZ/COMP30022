import { useQuery } from 'react-query'
import { getLeague } from 'api'
import { extractData } from 'utils'
import { useRouter } from 'next/router'

const useLeagues = (options = {}) => {
    const router = useRouter()
    const leagueId = router.query.leagueId
    const { data, isLoading, error } = useQuery(['league', leagueId], getLeague, options)
    const league = extractData(data)
    return { league, isLoading, error }
}

export default useLeagues
