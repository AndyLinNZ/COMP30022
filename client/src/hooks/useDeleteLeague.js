import { useMutation } from 'react-query'
import { deleteLeague } from 'api'
import useUserDetails from './useUserDetails'
import { getLeagueFromUser } from 'utils'

const useDeleteLeague = (options = {}) => {
    const { user } = useUserDetails()
    const leagueId = getLeagueFromUser(user)?._id
    return useMutation(() => deleteLeague(leagueId), options)
}

export default useDeleteLeague
