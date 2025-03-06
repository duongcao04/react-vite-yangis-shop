import { AxiosResponse } from 'axios'

import type { User } from '@/types/user'

import axiosClient, { TReponse, axiosAuth } from './axiosClient'

export type TLogin = Pick<User, 'email'> & {
    password: string
}
export type TRegister = TLogin &
    Pick<User, 'first_name' | 'last_name' | 'phone_number'>
export type TLoginResponse = {
    access_token: { value: string; expires_at: string }
    refresh_token: string
}

const authApi = {
    register: async (
        newUser: TRegister
    ): Promise<AxiosResponse<TReponse<TLoginResponse>>> => {
        const url = 'auth/register'
        return await axiosClient.post(url, newUser, {
            withCredentials: true,
        })
    },
    login: async (
        user: TLogin
    ): Promise<AxiosResponse<TReponse<TLoginResponse>>> => {
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
        return await axiosAuth.get(url)
    },
    logout: async () => {
        const url = `auth/logout`
        return await axiosClient.get(url)
    },
}

export default authApi
