import { useQuery } from 'react-query'
import { getAllSeasonGrades } from 'api'
import { extractData } from 'utils'
import { useRouter } from 'next/router'

const useGetAllSeasonGrades = (options = {}) => {
    const router = useRouter()
    const seasonId = router.query?.seasonId
    const { data, isLoading, error } = useQuery(['grades', seasonId], getAllSeasonGrades, {
        ...options,
        enabled: !!seasonId,
    })
    const grades = extractData(data)
    return { grades, isLoading, error }
}

export default useGetAllSeasonGrades
