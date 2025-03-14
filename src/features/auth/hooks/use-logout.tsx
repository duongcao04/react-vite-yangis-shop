import { useState } from 'react'

import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useAuthContext } from '@/context/auth-context'

import type { User } from '@/types/user'

const useLogout = () => {
    const navigates = useNavigate()
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()
    const [, , removeToken] = useCookies()

    const logout = async () => {
        setLoading(true)
        try {
            // const params = {}
            // await authApi.logout(params)
            removeToken('accessToken')
            localStorage.removeItem('__user-information')
            localStorage.removeItem('refreshToken')
            toast.success('Đăng xuất thành công')
            navigates('/')
            setAuthUser({} as User)
        } catch (error) {
            toast.error('Đã xảy ra lỗi')
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}
export default useLogout
