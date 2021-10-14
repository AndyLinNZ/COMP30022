import { useMutation } from 'react-query'
import { editGrade } from 'api'

const useEditGrade = (options = {}) => {
    return useMutation((data) => editGrade(data, data._id), options)
}

export default useEditGrade
