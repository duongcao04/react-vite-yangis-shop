import { useState } from 'react'

import { AxiosError, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'

import { useToast } from '@/hooks/use-toast'

import authApi from '@/apis/auth.api'
import { type User } from '@/types/user'

import { TError, TReponse } from './use-register'

export const useGetUserProfile = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const { onToast } = useToast()
    const navigate = useNavigate()

    const getUser: () => Promise<User> = async () => {
        setLoading(true)
        try {
            const res: AxiosResponse<TReponse<User>> =
                await authApi.getProfile()
            navigate('/')

            const user: User = res.data.data
            return user
        } catch (error) {
            const err = error as AxiosError<TError>

            onToast({
                title: 'Get user profile failed !',
                description: `${err.response?.data.message}`,
                color: 'danger',
            })
            return {} as User
        } finally {
            setLoading(false)
        }
    }

    return { isLoading, getUser }
}
