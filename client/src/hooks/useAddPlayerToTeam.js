import { useMutation } from 'react-query'
import useUserDetails from './useUserDetails'
import { getTeamFromUser } from 'utils'
import { addPlayerToTeam } from 'api'

const useAddPlayerToTeam = (options = {}) => {
    const { user } = useUserDetails()
    const teamId = getTeamFromUser(user)?._id
    return useMutation((data) => addPlayerToTeam(data, teamId), options)
}

export default useAddPlayerToTeam
