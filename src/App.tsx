import * as React from 'react'
import { Route, Routes } from 'react-router-dom'

import ScrollToTop from '@/components/ScrollToTop'
import { Toaster } from '@/components/ui/sonner'
import { useAuthContext } from '@/context/AuthContext'
import DefaultLayout from '@/layouts/DefaultLayout'
import GuestGuard from '@/layouts/Guard/GuestGuard'
import adminRoutes from '@/routes/adminRoutes'
import globalRoutes, { IRoute } from '@/routes/globalRoutes'

export default function App() {
    const { authUser } = useAuthContext()
    const [routes, setRoutes] = React.useState<IRoute[]>(globalRoutes)

    React.useLayoutEffect(() => {
        if (authUser.role === 'admin') {
            const newRoutes = [...globalRoutes, ...adminRoutes]
            setRoutes(newRoutes)
        } else {
            setRoutes(globalRoutes)
        }
    }, [authUser])

    return (
        <React.Fragment>
            <ScrollToTop />
            <Routes>
                {routes.map((route) => {
                    const Layout = route.layout ?? DefaultLayout
                    const Guard = route.guard ?? GuestGuard
                    const Page = route.element
                    const Path = route.path

                    return (
                        <Route
                            key={route.id}
                            path={Path}
                            element={
                                <Guard>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </Guard>
                            }
                        />
                    )
                })}
            </Routes>
            <Toaster richColors position="top-right" />
        </React.Fragment>
    )
}
