import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useAuthContext } from '@/context/auth-context'

import authApi from '@/apis/auth.api'

export const useRegister = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const { setAuthUser } = useAuthContext()

    const register = async (newUser: NewUser) => {
        setLoading(true)
        try {
            const res = await authApi.register(newUser)
            const { data, message, status } = res.data

            if (status === 201) {
                const userData = data.user
                localStorage.setItem(
                    '__user-information',
                    JSON.stringify(userData)
                )
                setAuthUser(userData)
                toast.success('Đăng ký tài khoản thành công')
                setTimeout(() => {
                    navigate('/')
                }, 5001)
            } else {
                throw new Error(message)
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi', { description: `${error}` })
        } finally {
            setLoading(false)
        }
    }

    return { loading, register }
}
