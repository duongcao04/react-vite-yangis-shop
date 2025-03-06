import { useState } from 'react'

import { AxiosError, AxiosResponse } from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { useToast } from '@/hooks/use-toast'

import { useAuthContext } from '@/context/auth-context'

import authApi, { type TLogin, TLoginResponse } from '@/apis/auth.api'
import type { TError, TReponse } from '@/apis/axiosClient'
import { config } from '@/config'

import { useGetUserProfile } from './use-get-user-profile'

export const useLogin = () => {
    const [, setCookie] = useCookies()
    const [isLoading, setLoading] = useState<boolean>(false)
    const { onToast } = useToast()
    const navigate = useNavigate()
    const { getUser } = useGetUserProfile()
    const { setAuthUser } = useAuthContext()

    const login = async (loginUser: TLogin) => {
        setLoading(true)
        try {
            const res: AxiosResponse<TReponse<TLoginResponse>> =
                await authApi.login(loginUser)

            if (res.status === 200) {
                const { access_token, refresh_token } = res.data.data

                setCookie('accessToken', access_token.value, {
                    path: '/',
                    expires: new Date(access_token.expires_at),
                })
                localStorage.setItem(
                    'refreshToken',
                    JSON.stringify(refresh_token)
                )
                onToast({
                    title: res.data.message,
                    description: null,
                    color: 'success',
                })

                const getAuthUser = await getUser()
                setAuthUser(getAuthUser)

                if (getAuthUser.role === 'ADMIN') {
                    navigate(config.routes.dashboard.home)
                } else {
                    navigate('/')
                }
            }
        } catch (error) {
            const err = error as AxiosError<TError>

            onToast({
                title: 'Login failed !',
                description: `${err.response?.data.message}`,
                color: 'danger',
            })
        } finally {
            setLoading(false)
        }
    }

    return { isLoading, login }
}
