import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAuthContext } from '@/context/AuthContext'
import { isObjectEmpty } from '@/utils/isObjectEmpty'

export type IAuthGuardProps = {
    children: React.ReactNode
}

function AuthGuard({ children }: IAuthGuardProps) {
    const { authUser } = useAuthContext()
    
    if (isObjectEmpty(authUser)) return <Navigate to="/login" replace />

    return <React.Fragment>{children}</React.Fragment>
}

export default AuthGuard
