import { ReactNode, createContext, useContext, useState } from 'react'

import { User } from '@/types/user'

export type AuthContextType = {
    authUser: User
    setAuthUser: (c: User) => void
}

export const AuthContext = createContext<AuthContextType>({
    authUser: {} as User,
    setAuthUser: () => {},
})

// Custom hook to use the AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const initAuthUser = JSON.parse(
        localStorage.getItem('__user-information') ?? '{}'
    )
    const [authUser, _setAuthUser] = useState<User>(initAuthUser)
    const setAuthUser = (user: User) => {
        localStorage.setItem('__user-information', JSON.stringify(user))
        _setAuthUser(user)
    }

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}
