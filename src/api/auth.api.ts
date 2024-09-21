import axiosClient from '@/api/axiosClient'

const authApi = {
    register: async (newUser: NewUser) => {
        const url = 'user/register'
        return await axiosClient.post(url, newUser)
    },
    login: async (user: Login) => {
        const url = `user/login`
        return await axiosClient.post(url, user)
    },
    logout: async (params: object) => {
        const url = `user/logout/:id`
        return await axiosClient.get(url, { params })
    },
}

export default authApi
