import axios from 'axios'
import { API_URL } from 'utils/constants'

const baseURL = API_URL

const headers = {}

const token = typeof window !== 'undefined' && window.localStorage.getItem('token')

if (token) {
    headers.Authorization = `Bearer ${token}`
}

const axiosInstance = axios.create({
    baseURL,
    headers,
})

axios.interceptors.request.use(
    (config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        config.headers = {
            Authorization: token ? `Bearer ${token}` : null,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

axios.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (typeof window !== 'undefined' && error.config.status === 403) {
            window.localStorage.removeItem('token')

            window.location = '/login'
        } else {
            return Promise.reject(error)
        }
    }
)

export default axiosInstance
