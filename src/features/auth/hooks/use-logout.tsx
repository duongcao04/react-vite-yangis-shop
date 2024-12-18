import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useAuthContext } from '@/context/auth-context'

const useLogout = () => {
    const navigates = useNavigate()
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
            // const params = {}
            // await authApi.logout(params)
            localStorage.removeItem('__user-information')
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
