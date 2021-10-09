import axios from 'axios'
import { API_URL } from 'utils/constants'
import { isBrowser } from 'utils'

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
        const token = isBrowser() && window.localStorage.getItem('token')
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
    (error) => {
        // all api routes except /auth/login and /auth/register
        // will send "Unauthorized" in the body
        if (isBrowser() && error.response.status === 401 && error.response.data == 'Unauthorized') {
            window.localStorage.removeItem('token')

            window.location = '/login'
        } else {
            return Promise.reject(error)
        }
    }
)

export default axiosInstance
