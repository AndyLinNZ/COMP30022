import { useQuery } from 'react-query'
import { getAllLeagueSeasons } from 'api'
import { extractData } from 'utils'
import { useRouter } from 'next/router'

const useGetAllLeagueSeasons = (options = {}) => {
    const router = useRouter()
    const leagueId = router.query?.leagueId
    const { data, isLoading, error } = useQuery(['seasons', leagueId], getAllLeagueSeasons, {
        ...options,
        enabled: !!leagueId,
    })
    const seasons = extractData(data)
    return { seasons, isLoading, error }
}

export default useGetAllLeagueSeasons
