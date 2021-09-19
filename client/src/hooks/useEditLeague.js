import { useMutation } from 'react-query'
import { editLeague } from 'api'
import useUserDetails from './useUserDetails'
import { getLeagueFromUser } from 'utils'

const useEditLeague = (options = {}) => {
    const { user } = useUserDetails()
    const leagueId = getLeagueFromUser(user)?._id
    return useMutation((data) => editLeague(data, leagueId), options)
}

export default useEditLeague
