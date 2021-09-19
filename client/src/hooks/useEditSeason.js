import { useMutation } from 'react-query'
import { editSeason } from 'api'
import useUserDetails from './useUserDetails'
import { getSeasonFromUser } from 'utils'

const useEditSeason = (options = {}) => {
    const { user } = useUserDetails()
    const seasonId = getSeasonFromUser(user)?._id
    return useMutation((data) => editSeason(data, seasonId), options)
}

export default useEditSeason
