import * as React from 'react'

import { Route, Routes } from 'react-router-dom'

import { useAuthContext } from '@/context/auth-context'

import ScrollToTop from '@/components/scroll-to-top'
import { Toaster } from '@/components/ui/sonner'

import AuthGuard from '@/guards/auth-guard'
import GuestGuard from '@/guards/guest-guard'
import DefaultLayout from '@/layouts/default-layout'
import { ADMIN_ROUTES } from '@/routes/admin.route'
import { GLOBAL_ROUTES, type TRoute } from '@/routes/public.route'

export default function App() {
    const { authUser } = useAuthContext()
    const [routes, setRoutes] = React.useState<TRoute[]>(GLOBAL_ROUTES)

    React.useLayoutEffect(() => {
        if (!authUser.role) {
            setRoutes(GLOBAL_ROUTES)
        } else {
            if (authUser.role === 'ADMIN') {
                setRoutes([...GLOBAL_ROUTES, ...ADMIN_ROUTES])
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
