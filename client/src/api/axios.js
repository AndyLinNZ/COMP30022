import axios from 'axios'
import { API_URL } from 'utils/constants'

const baseURL = API_URL

const axiosInstance = axios.create({
    baseURL,
})

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        const token = typeof window !== 'undefined' && window.localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (typeof window !== 'undefined' && error.config.status === 401) {
            window.localStorage.removeItem('token')

            window.location = '/login'
        } else {
            return Promise.reject(error)
        }
    }
)

export default axiosInstance
