import { useMutation } from 'react-query'
import { createFixtures } from 'api'
import { useRouter } from 'next/router'

const useCreateFixtures = (options = {}) => {
    const router = useRouter()
    const gradeId = router.query?.gradeId
    return useMutation((data) => createFixtures(gradeId, data), options)
}

export default useCreateFixtures
