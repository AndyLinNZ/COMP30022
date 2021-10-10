import { useQuery } from 'react-query'
import { getSeason } from 'api'
import { extractData } from 'utils'
import { useRouter } from 'next/router'

const useSeason = (options = {}) => {
    const router = useRouter()
    const seasonId = router.query.seasonId
    const { data, isLoading, error } = useQuery(['season', seasonId], getSeason, {
        ...options,
        enabled: !!seasonId,
    })
    const season = extractData(data)
    return { season, isLoading, error }
}

export default useSeason
