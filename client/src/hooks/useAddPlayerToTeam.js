import { useMutation } from 'react-query'
import { addPlayerToTeam } from 'api'
import { useRouter } from 'next/router'

const useAddPlayerToTeam = (options = {}) => {
    const router = useRouter()
    const teamId = router.query.teamId
    return useMutation((data) => addPlayerToTeam(data, teamId), options)
}

export default useAddPlayerToTeam
