import { useMutation } from 'react-query'
import { editTeam } from 'api'
import useUserDetails from './useUserDetails'
import { getTeamFromUser } from 'utils'

const useEditTeam = (options = {}) => {
    const { user } = useUserDetails()
    const teamId = getTeamFromUser(user)?._id
    return useMutation((data) => editTeam(data, teamId), options)
}

export default useEditTeam
