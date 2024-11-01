import axiosClient from './axiosClient'

const authApi = {
    register: async (newUser: NewUser) => {
        const url = 'users/register'
        return await axiosClient.post(url, newUser)
    },
    login: async (user: Login) => {
        const url = `users/login`
        return await axiosClient.post(url, user)
    },
    logout: async (params: object) => {
        const url = `users/logout/:id`
        return await axiosClient.get(url, { params })
    },
}

export default authApi
