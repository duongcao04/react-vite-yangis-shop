import * as React from 'react'

import { Route, Routes } from 'react-router-dom'

import { useAuthContext } from '@/context/AuthContext'

import ScrollToTop from '@/components/ScrollToTop'
import { Toaster } from '@/components/ui/sonner'

import { AuthGuard, GuestGuard } from '@/guards'
import DefaultLayout from '@/layouts/DefaultLayout'
import adminRoutes from '@/routes/adminRoutes'
import globalRoutes, { TRoute } from '@/routes/globalRoutes'

export default function App() {
    const { authUser } = useAuthContext()
    const [routes, setRoutes] = React.useState<TRoute[]>(globalRoutes)

    React.useLayoutEffect(() => {
        if (!authUser.role) {
            setRoutes(globalRoutes)
        } else {
            if (authUser.role === 'admin') {
                setRoutes([...globalRoutes, ...adminRoutes])
            }
        }
    }, [authUser])

    return (
        <React.Fragment>
            <ScrollToTop />
            <Routes>
                {routes.map((route, index) => {
                    const Layout = route.layout ?? DefaultLayout
                    const Page = route.element
                    const Path = route.path
                    const Guard =
                        route.isPrivateRoute === true ? AuthGuard : GuestGuard

                    return (
                        <Route
                            key={'route' + index}
                            path={Path}
                            element={
                                <Layout>
                                    <Guard>
                                        <Page />
                                    </Guard>
                                </Layout>
                            }
                        />
                    )
                })}
            </Routes>
            <Toaster richColors position="bottom-center" />
        </React.Fragment>
    )
}
