import { useQuery } from 'react-query'
import { getAllLeagueSeasons } from 'api'
import { extractData, getLeagueFromUser } from 'utils'
import useUserDetails from './useUserDetails'

const useGetAllLeagueSeasons = (options = {}) => {
    const { user } = useUserDetails()
    const leagueId = getLeagueFromUser(user)?._id
    const { data, isLoading, error } = useQuery(['seasons', leagueId], getAllLeagueSeasons, options)
    const seasons = extractData(data)
    return { seasons, isLoading, error }
}

export default useGetAllLeagueSeasons
