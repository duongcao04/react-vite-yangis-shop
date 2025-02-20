import { useState } from 'react'

import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { useToast } from '@/hooks/use-toast'

import authApi, { ILogin } from '@/apis/auth.api'

export const useLogin = () => {
    const [, setCookie] = useCookies()
    const [isLoading, setLoading] = useState<boolean>(false)
    const { onToast } = useToast()
    const navigate = useNavigate()

    const login = async (loginUser: ILogin) => {
        setLoading(true)
        try {
            const res = await authApi.login(loginUser)

            if (res.status === 200) {
                const { access_token, refresh_token } = res.data.data

                setCookie('access_token', access_token.value, {
                    path: '/',
                    expires: new Date(access_token.expires_at),
                })
                localStorage.setItem(
                    'refresh_token',
                    JSON.stringify(refresh_token)
                )
                onToast({
                    title: res.data.message,
                    description: null,
                    color: 'success',
                })
                navigate('/')
            }
        } catch (error) {
            onToast({
                title: 'Login failed !',
                description: `${error}`,
                color: 'danger',
            })
        } finally {
            setLoading(false)
        }
    }

    return { isLoading, login }
}
