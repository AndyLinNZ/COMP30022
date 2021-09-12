import { useMutation } from 'react-query'
import { createLeagueSeason } from 'api'
import useUserDetails from './useUserDetails'
import { getLeagueFromUser } from 'utils'

const useCreateLeagueSeason = (options = {}) => {
    const { user } = useUserDetails()
    const leagueId = getLeagueFromUser(user)?._id
    return useMutation((data) => createLeagueSeason(data, leagueId), options)
}

export default useCreateLeagueSeason
