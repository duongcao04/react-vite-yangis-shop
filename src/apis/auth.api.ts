import axiosClient from './axiosClient'

export interface ILogin {
    email: string
    password: string
}

export interface IRegister {
    first_name: string
    last_name: string
    email: string
    password: string
    phone_number: string
}

const authApi = {
    register: async (newUser: IRegister) => {
        const url = 'auth/register'
        return await axiosClient.post(url, newUser, {
            withCredentials: true,
        })
    },
    login: async (user: ILogin) => {
        const url = 'auth/login'
        return await axiosClient.post(url, user, {
            withCredentials: true,
        })
    },
    refreshToken: async (
        refreshToken: string
    ): Promise<{ access_token: string }> => {
        const url = 'auth/refresh-token'
        return await axiosClient.post(url, { refresh_token: refreshToken })
    },
    getProfile: async () => {
        const url = 'auth/profile'
        return await axiosClient.get(url)
    },
    logout: async () => {
        const url = `auth/logout`
        return await axiosClient.get(url)
    },
}

export default authApi
