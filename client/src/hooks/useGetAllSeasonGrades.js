import { useQuery } from 'react-query'
import { getAllSeasonGrades } from 'api'
import { extractData, getSeasonFromUser } from 'utils'
import useUserDetails from './useUserDetails'

const useGetAllSeasonGrades = (options = {}) => {
    const { user } = useUserDetails()
    const seasonId = getSeasonFromUser(user)?._id
    const { data, isLoading, error } = useQuery(['grades', seasonId], getAllSeasonGrades, options)
    const grades = extractData(data)
    return { grades, isLoading, error }
}

export default useGetAllSeasonGrades
