import { useState } from 'react'

import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { useToast } from '@/hooks/use-toast'

import authApi, { IRegister } from '@/apis/auth.api'

export const useRegister = () => {
    const [, setCookie] = useCookies()
    const [isLoading, setLoading] = useState<boolean>(false)
    const { onToast } = useToast()
    const navigate = useNavigate()

    const register = async (user: IRegister) => {
        setLoading(true)
        try {
            const res = await authApi.register(user)

            if (res.status === 201) {
                const { access_token, refresh_token } = res.data.data

                setCookie('access_token', access_token.value, {
                    expires: new Date(access_token.expires_at),
                })
                localStorage.setItem(
                    'refresh_token',
                    JSON.stringify(refresh_token)
                )
                onToast({
                    title: 'Sign up successfully !',
                    description: res.data.message,
                    color: 'success',
                })
                navigate('/')
            }
        } catch (error) {
            onToast({
                title: 'Sign up failed !',
                description: `${error}`,
                color: 'danger',
            })
        } finally {
            setLoading(false)
        }
    }

    return { isLoading, register }
}
