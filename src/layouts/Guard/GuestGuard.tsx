import React from 'react'

function GuestGuard({ children }: { children: React.ReactNode }) {
    return <React.Fragment>{children}</React.Fragment>
}

export default GuestGuard
