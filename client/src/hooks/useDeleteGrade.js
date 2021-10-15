import { useMutation } from 'react-query'
import { deleteGrade } from 'api'
import { useRouter } from 'next/router'

const useDeleteGrade = (options = {}) => {
    const router = useRouter()
    const gradeId = router.query.gradeId
    return useMutation(() => deleteGrade(gradeId), options)
}

export default useDeleteGrade
