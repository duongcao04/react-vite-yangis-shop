import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAuthContext } from '@/context/auth-context'

import { config } from '@/configs'
import { isObjectEmpty } from '@/utils/is-object-empty'

function AuthGuard({ children }: { children: React.ReactNode }) {
    const { authUser } = useAuthContext()

    if (isObjectEmpty(authUser))
        return <Navigate to={config.routes.login} replace />

    return <React.Fragment>{children}</React.Fragment>
}

export default AuthGuard
