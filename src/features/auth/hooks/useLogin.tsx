import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useAuthContext } from '@/context/AuthContext'

import authApi from '@/apis/auth.api'

export const useLogin = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const { setAuthUser } = useAuthContext()

    const login = async (user: Login) => {
        try {
            setLoading(true)
            const res = await authApi.login(user)
            const { data, message, status } = res.data
            if (status === 200) {
                const useData = data.user
                localStorage.setItem(
                    '__user-information',
                    JSON.stringify(useData)
                )
                setAuthUser(useData)
                toast.success('Đăng nhập thành công')
                data.user.role === 'admin'
                    ? navigate('/dashboard')
                    : navigate('/')
            } else {
                throw new Error(message)
            }
        } catch (error) {
            toast.error('Đăng nhập thất bại', {
                description: `${error}`,
            })
        } finally {
            setLoading(false)
        }
    }

    return { loading, login }
}
