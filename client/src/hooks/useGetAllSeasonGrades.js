import { useQuery } from 'react-query'
import { getAllSeasonGrades } from 'api'
import { extractData, getSeasonFromUser, getLeagueFromUser } from 'utils'
import useUserDetails from './useUserDetails'

const useGetAllSeasonGrades = (options = {}) => {
    const { user } = useUserDetails()
    const leagueId = getLeagueFromUser(user)?._id
    const seasonId = getSeasonFromUser(user)?._id
    const { data, isLoading, error } = useQuery(['grades', seasonId, leagueId], getAllSeasonGrades, options)
    const grades = extractData(data)
    return { grades, isLoading, error }
}

export default useGetAllSeasonGrades
