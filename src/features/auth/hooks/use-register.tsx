import { useState } from 'react'

import { AxiosError, AxiosResponse } from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { useToast } from '@/hooks/use-toast'

import { useAuthContext } from '@/context/auth-context'

import authApi, { type TLoginResponse, type TRegister } from '@/apis/auth.api'
import type { TError, TReponse } from '@/apis/axiosClient'

import { useGetUserProfile } from './use-get-user-profile'

export const useRegister = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [, setCookie] = useCookies()
    const { onToast } = useToast()
    const navigate = useNavigate()
    const { getUser } = useGetUserProfile()
    const { setAuthUser } = useAuthContext()

    const register = async (user: TRegister) => {
        setLoading(true)
        try {
            const res: AxiosResponse<TReponse<TLoginResponse>> =
                await authApi.register(user)
            const { access_token, refresh_token } = res.data.data

            if (res.status === 201) {
                setCookie('accessToken', access_token.value, {
                    path: '/',
                    expires: new Date(access_token.expires_at),
                })
                localStorage.setItem(
                    'refreshToken',
                    JSON.stringify(refresh_token)
                )
                onToast({
                    title: 'Sign up successfully !',
                    description: res.data.message,
                    color: 'success',
                })
                navigate('/')
                const getAuthUser = await getUser()
                setAuthUser(getAuthUser)
            }
        } catch (error) {
            const err = error as AxiosError<TError>

            onToast({
                title: 'Sign up failed !',
                description: `${err.response?.data.message}`,
                color: 'danger',
            })
        } finally {
            setLoading(false)
        }
    }

    return { isLoading, register }
}
