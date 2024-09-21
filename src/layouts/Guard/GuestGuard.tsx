import React from 'react'

export type IGuestGuardProps = {
    children: React.ReactNode
}

function GuestGuard({ children }: IGuestGuardProps) {
    return <React.Fragment>{children}</React.Fragment>
}

export default GuestGuard
