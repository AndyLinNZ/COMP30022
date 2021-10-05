import { useQuery } from 'react-query'
import { getGrade } from 'api'
import { extractData } from 'utils'
import { useRouter } from 'next/router'

const useGrade = (options = {}) => {
    const router = useRouter()
    const gradeId = router.query.gradeId
    const { data, isLoading, error } = useQuery(['grade', gradeId], getGrade, {
        ...options,
        enabled: !!gradeId,
    })
    const grade = extractData(data)
    return { grade, isLoading, error }
}

export default useGrade
