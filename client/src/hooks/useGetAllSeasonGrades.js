import { useQuery } from 'react-query'
import { getAllSeasonGrades } from 'api'
import { extractData, getSeasonFromUser } from 'utils'
import useUserDetails from './useUserDetails'
import { useRouter } from 'next/router'

const useGetAllSeasonGrades = (options = {}) => {
    const router = useRouter()
    const { user } = useUserDetails()
    let seasonId = router.query?.seasonId
    if (!seasonId) {
        seasonId = getSeasonFromUser(user)?._id
    }
    const { data, isLoading, error } = useQuery(['grades', seasonId], getAllSeasonGrades, options)
    const grades = extractData(data)
    return { grades, isLoading, error }
}

export default useGetAllSeasonGrades
