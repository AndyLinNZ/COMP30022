import { useMutation } from 'react-query'
import { createSeasonGrade } from 'api'
import useUserDetails from './useUserDetails'
import { getSeasonFromUser, getLeagueFromUser } from 'utils'

const useCreateSeasonGrade = (options = {}) => {
    const { user } = useUserDetails()
    const leagueId = getLeagueFromUser(user)?._id
    const seasonId = getSeasonFromUser(user)?._id
    return useMutation((data) => createSeasonGrade(data, seasonId, leagueId), options)
}

export default useCreateSeasonGrade
