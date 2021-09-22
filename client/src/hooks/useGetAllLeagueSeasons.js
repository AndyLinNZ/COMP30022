import { useQuery } from 'react-query'
import { getAllLeagueSeasons } from 'api'
import { extractData, getLeagueFromUser } from 'utils'
import useUserDetails from './useUserDetails'
import { useRouter } from 'next/router'

const useGetAllLeagueSeasons = (options = {}) => {
    const router = useRouter()
    let leagueId = router.query?.leagueId
    const { user } = useUserDetails()
    if (!leagueId) {
        leagueId = getLeagueFromUser(user)?._id
    }
    const { data, isLoading, error } = useQuery(['seasons', leagueId], getAllLeagueSeasons, options)
    const seasons = extractData(data)
    return { seasons, isLoading, error }
}

export default useGetAllLeagueSeasons
