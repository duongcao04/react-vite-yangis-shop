import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useAuthContext } from '@/context/auth-context'

import authApi from '@/apis/auth.api'
import { config } from '@/config'
import { type Login } from '@/types/user'

export const useLogin = () => {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState<boolean>(false)
    const { setAuthUser } = useAuthContext()

    const login = async (user: Login) => {
        try {
            setLoading(true)
            const res = await authApi.login(user).then((result) => result.data)
            const { data, message, statusCode, error } = res

            if (statusCode !== 200) {
                if (error) throw new Error(error)
                throw new Error(message)
            }

            localStorage.setItem('__user-information', JSON.stringify(data))
            setAuthUser(data)
            toast.success(message)
            data.role === 'ADMIN'
                ? navigate(config.routes.dashboard.home)
                : navigate(config.routes.home)
        } catch (error) {
            toast.error('Log in failed', {
                description: `${error}`,
            })
        } finally {
            setLoading(false)
        }
    }

    return { isLoading, login }
}
