import { useMutation } from 'react-query'
import { deletePlayersFromTeam } from 'api'
import { useRouter } from 'next/router'

const useDeletePlayersFromTeam = (options = {}) => {
    const router = useRouter()
    const teamId = router.query.teamId
    return useMutation((data) => deletePlayersFromTeam(data, teamId), options)
}

export default useDeletePlayersFromTeam
