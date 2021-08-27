import axiosInstance from './axios'

export const registerUser = async (user) => {
    const data = await axiosInstance.post('/auth/register', user)
    return data
}

export const login = async (user) => {
    const { email, password } = user
    const data = await axiosInstance.post('/auth/login', {
        username: email,
        password,
    })
    return data
}
