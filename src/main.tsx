import React from 'react'

import { DevSupport } from '@react-buddy/ide-toolbox'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { AuthContextProvider } from '@/context/AuthContext.tsx'
import { ThemeProvider } from '@/context/ThemeContext.tsx'

import { ComponentPreviews, useInitial } from '@/dev'
import { store } from '@/redux/store'

import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <QueryClientProvider client={queryClient}>
                <HelmetProvider>
                    <ThemeProvider
                        defaultTheme="light"
                        storageKey="vite-ui-theme"
                    >
                        <AuthContextProvider>
                            <Provider store={store}>
                                <DevSupport
                                    ComponentPreviews={ComponentPreviews}
                                    useInitialHook={useInitial}
                                >
                                    <App />
                                </DevSupport>
                            </Provider>
                        </AuthContextProvider>
                    </ThemeProvider>
                </HelmetProvider>
                {/* Dev tool for react-query */}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Router>
    </React.StrictMode>
)
