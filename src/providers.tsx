import React from 'react'

import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { Provider as ReduxProvider } from 'react-redux'

import { AuthContextProvider } from '@/context/auth-context'
import { ThemeProvider } from '@/context/theme-context'

import { store } from '@/redux/store'

const queryClient = new QueryClient()

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HelmetProvider>
                <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                    <QueryClientProvider client={queryClient}>
                        <ReduxProvider store={store}>
                            <NextUIProvider>
                                <AuthContextProvider>
                                    {children}
                                </AuthContextProvider>
                            </NextUIProvider>
                        </ReduxProvider>
                    </QueryClientProvider>
                </ThemeProvider>
            </HelmetProvider>
        </>
    )
}

export default Providers
