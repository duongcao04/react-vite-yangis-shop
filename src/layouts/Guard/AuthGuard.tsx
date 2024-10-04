import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAuthContext } from '@/context/AuthContext'

import { config } from '@/config'
import { isObjectEmpty } from '@/utils/isObjectEmpty'

function AuthGuard({ children }: { children: React.ReactNode }) {
    const { authUser } = useAuthContext()

    if (isObjectEmpty(authUser))
        return <Navigate to={config.routes.login} replace />

    return <React.Fragment>{children}</React.Fragment>
}

export default AuthGuard
