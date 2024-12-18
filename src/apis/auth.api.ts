import { type Login, type NewUser } from '../types/user'
import axiosClient from './axiosClient'

const authApi = {
    register: async (newUser: NewUser) => {
        const url = 'auth/register'
        return await axiosClient.post(url, newUser)
    },
    login: async (user: Login) => {
        const url = `auth/login`
        return await axiosClient.post(url, user)
    },
    logout: async (params: object) => {
        const url = `auth/logout/:id`
        return await axiosClient.get(url, { params })
    },
}

export default authApi
