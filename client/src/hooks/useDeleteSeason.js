import { useMutation } from 'react-query'
import { deleteSeason } from 'api'
import useUserDetails from './useUserDetails'
import { getSeasonFromUser } from 'utils'

const useDeleteSeason = (options = {}) => {
    const { user } = useUserDetails()
    const seasonId = getSeasonFromUser(user)?._id
    return useMutation(() => deleteSeason(seasonId), options)
}

export default useDeleteSeason
